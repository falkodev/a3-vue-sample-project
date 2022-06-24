const moment = require('moment')
const config = require('config')
const path = require('path')
const asyncFs = require('fs/promises')

const LEGAL_AGE = 18
const MIN_PASSWORD_LENGTH = config.get('register.minPasswordLength')
module.exports.LEGAL_AGE = LEGAL_AGE
module.exports.MIN_PASSWORD_LENGTH = MIN_PASSWORD_LENGTH

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'customer',
    label: 'apostrophe:customer',
    localized: false,
    publicApiProjection: { slug: 1, archived: 1 },
  },
  fields: {
    add: {
      firstName: {
        type: 'string',
        required: true,
      },

      lastName: {
        type: 'string',
        required: true,
      },

      birthDate: {
        type: 'date',
        required: true,
      },

      email: {
        type: 'email',
        required: true,
      },

      image: {
        type: 'attachment',
        label: 'apostrophe:image',
        fileGroup: 'images',
      },
      newsletter: {
        label: 'apostrophe:registerPage.newsletter',
        type: 'boolean',
      },
    },

    group: {
      basics: {
        fields: [
          'firstName',
          'lastName',
          'birthDate',
          'email',
          'image',
          'newsletter',
        ],
      },
    },
  },

  extendRestApiRoutes(self) {
    return {
      async post(_super, req) {
        try {
          const { user } = self.apos.task.getAdminReq()
          req.user = user

          return await _super(req)
        } catch (error) {
          const err = error.message || error
          if (err.includes('E11000')) {
            throw self.apos.error(
              'invalid',
              req.t('apostrophe:registerPage.existingAccount'),
            )
          } else if (err.includes('birth')) {
            throw self.apos.error(
              'invalid',
              req.t('apostrophe:registerPage.invalidBirthDate'),
            )
          } else {
            throw self.apos.error('invalid')
          }
        }
      },

      async patch(_super, req, _id) {
        const currentUser = req.user
        const customerLinkedToCurrentUser = await self
          .find(req, { email: req.user?.username })
          .project({ _id: 1 })
          .toObject()
        if (customerLinkedToCurrentUser?._id === req.params?._id) {
          const { user } = self.apos.task.getAdminReq()
          req.user = user
          await self.apos.user.update(req, { ...currentUser, archived: true })
        }

        return _super(req, _id)
      },
    }
  },

  extendMethods() {
    /* istanbul ignore next */
    return {
      getRestQuery(_super, req) {
        const query = _super(req)
        if (req.user.role === 'editor') {
          query._domains(req.user.domainIds[0])
        }
        return query
      },

      getBrowserData(_super, req) {
        const browserOptions = _super(req)

        if (req.user?.role === 'editor') {
          browserOptions.batchOperations = []
          browserOptions.quickCreate = false
          browserOptions.showCreate = false
          browserOptions.canPublish = false
        }

        browserOptions.labels = {
          archiveAccount: req.t('apostrophe:archiveAccount'),
          yes: req.t('apostrophe:yes'),
          no: req.t('apostrophe:no'),
          error: req.t('apostrophe:loginErrorGeneric'),
        }

        return browserOptions
      },
    }
  },

  handlers(self) {
    return {
      beforeInsert: {
        checkPermissions(req, doc) {
          if (!req.user || req.user.role !== 'admin') {
            throw new Error('unauthorized')
          }
        },

        checkPasswordLength(req, doc) {
          if (req.body?.password) {
            doc.password = req.body.password
          }
          if (!doc.password || doc.password.length < MIN_PASSWORD_LENGTH) {
            throw new Error('invalid password')
          }
          return true
        },

        checkLegalAge(req, doc) {
          const validAge = moment().diff(doc.birthDate, 'years') >= LEGAL_AGE
          if (!validAge) {
            throw new Error('invalid birth date')
          }
          return validAge
        },

        titleCustomer(req, doc) {
          doc.title = doc.firstName + ' ' + doc.lastName
          return doc
        },

        createUser(req, doc) {
          return self.apos.user.insert(req, {
            role: 'guest',
            title: doc.title,
            password: doc.password,
            email: doc.email,
            username: doc.email,
            ...(doc.fixtures && { fixtures: doc.fixtures }), // add "fixtures" prop only if coming from fixtures
          })
        },

        removePassword(req, doc) {
          delete doc.password
          return doc
        },
      },

      '@apostrophecms/db:fixtures': {
        async customerFixtures(req) {
          try {
            self.apos.util.log('Starting customer fixtures')
            const imagesFolder = path.resolve(__dirname, './images/')
            const imagesNames = await asyncFs.readdir(imagesFolder)
            const uploadedImages = await Promise.all(
              imagesNames.map((imageName) => {
                const imagePath = `${imagesFolder}/${imageName}`
                return self.apos.attachment.insert(req, {
                  name: imageName,
                  path: imagePath,
                  fixtures: true,
                })
              }),
            )

            const customers = [
              {
                email: 'henri@roland-garros.fr',
                firstName: 'Henri',
                lastName: 'Cochet',
                birthDate: '1901-12-14',
                password: 'vino01',
                image: uploadedImages[0],
              },
              {
                email: 'rene@roland-garros.fr',
                firstName: 'René',
                lastName: 'Lacoste',
                birthDate: '1904-07-02',
                password: 'vino01',
                image: uploadedImages[1],
              },
              {
                email: 'jean@roland-garros.fr',
                firstName: 'Jean',
                lastName: 'Borotra',
                birthDate: '1898-08-13',
                password: 'vino01',
                image: uploadedImages[2],
              },
              {
                email: 'jacques@roland-garros.fr',
                firstName: 'Jacques',
                lastName: 'Brugnon',
                birthDate: '1895-05-11',
                password: 'vino01',
                image: uploadedImages[3],
              },
            ]

            const usersCollection = self.apos.db.collection('aposUsersSafe')
            await usersCollection.deleteMany({
              username: {
                $in: customers.map((customer) => customer.email),
              },
            })

            await Promise.all(
              customers.map((customer) =>
                self.insert(req, {
                  ...self.newInstance(),
                  ...customer,
                  fixtures: true,
                }),
              ),
            )

            self.apos.util.log('Customer fixtures done')
          } catch (error) {
            self.apos.util.error(`Customer fixtures error: ${error}`)
          }
        },
      },
    }
  },
}
