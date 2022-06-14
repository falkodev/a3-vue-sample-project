const path = require('path')
const config = require('config')

module.exports = {
  async setDefaultItems(self, label, moduleName) {
    const req = self.apos.task.getReq()
    const existingLabels = await self.find(req).toCount()

    if (existingLabels) {
      self.apos.util.log(
        `Default ${label} already existing: no update in db will occur!`,
      )
    } else {
      self.apos.util.log(`Feeding db with default ${label}`)
      const items = config.get(`${label}`)
      const defaultLocale = self.apos.i18n.defaultLocale

      for (const item of items) {
        let image, color, doc

        if (item.image) {
          const imageName = item.image
          const imagePath = path.resolve(
            __dirname,
            `../${moduleName}/images/`,
            imageName,
          )
          image = await self.apos.attachment.insert(req, {
            name: imageName,
            path: imagePath,
          })
        }

        if (item.color) {
          color = item.color
        }

        req.locale = defaultLocale
        const title = req.t(item.title)

        if (image) {
          doc = { title, image }
        } else if (color) {
          doc = { title, color }
        } else {
          doc = { title }
        }

        const insertedDoc = await self.insert(req, {
          ...self.newInstance(),
          ...doc,
        })

        for (const locale of Object.keys(self.apos.i18n.locales)) {
          /* istanbul ignore next */
          if (locale !== defaultLocale) {
            req.locale = locale
            insertedDoc.title = req.t(item.title)
            insertedDoc.slug = self.apos.util.slugify(insertedDoc.title)

            const insertedDocInLocale = await self.localize(
              req,
              insertedDoc,
              locale,
            )
            await self.publish(req, insertedDocInLocale, locale)
          }
        }
      }
      /* istanbul ignore next */
      self.apos.util.log(`Default ${label} added`)
    }
  },
}
