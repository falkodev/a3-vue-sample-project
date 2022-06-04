const path = require('path')
const config = require('config')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'activity',
    label: 'apostrophe:activity.label',
    pluralLabel: 'apostrophe:activity.pluralLabel',
    localized: true,
    quickCreate: false,
  },
  fields: {
    add: {
      image: {
        type: 'attachment',
        label: 'apostrophe:image',
        fileGroup: 'images',
      },
    },
    group: {
      basics: {
        fields: ['image'],
      },
    },
  },

  methods(self) {
    return {
      async setDefaultActivities() {
        try {
          const req = self.apos.task.getReq()
          const existingActivities = await self.find(req).toCount()

          if (existingActivities) {
            self.apos.util.log(
              'Default activities already existing: no update in db will occur!',
            )
          } else {
            self.apos.util.log('Feeding db with default activities')
            const activities = config.get('activities')
            const defaultLocale = self.apos.i18n.defaultLocale

            for (const activity of activities) {
              const imageName = activity.image
              const imagePath = path.resolve(__dirname, './images/', imageName)
              const image = await self.apos.attachment.insert(req, {
                name: imageName,
                path: imagePath,
              })
              req.locale = defaultLocale
              const title = req.t(activity.title)
              const doc = { title, image }

              const insertedDoc = await self.insert(req, {
                ...self.newInstance(),
                ...doc,
              })

              for (const locale of Object.keys(self.apos.i18n.locales)) {
                /* istanbul ignore next */
                if (locale !== defaultLocale) {
                  req.locale = locale
                  insertedDoc.title = req.t(activity.title)
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
            self.apos.util.log('Default activities added')
          }
        } catch (error) {
          self.apos.util.error(`Default activities error: ${error}`)
        }
      },
    }
  },

  tasks(self) {
    /* istanbul ignore next */
    return {
      defaults: {
        usage: 'npm run task -- domain-related/activity:defaults',
        async task() {
          await self.setDefaultActivities()
        },
      },
    }
  },

  handlers(self) {
    return {
      '@apostrophecms/db:defaults': {
        async addDefaults() {
          await self.setDefaultActivities()
        },
      },
    }
  },
}
