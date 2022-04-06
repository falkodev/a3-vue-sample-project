const moment = require('moment')
const LEGAL_AGE = 18
module.exports.LEGAL_AGE = LEGAL_AGE

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'customer',
    label: 'apostrophe:customer',
    localized: false,
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

      _domains: {
        label: 'apostrophe:domain',
        type: 'relationship',
        withType: 'place',
      },
    },
    group: {
      basics: {
        fields: ['firstName', 'lastName', 'birthDate', 'email', '_domains'],
      },
    },
  },

  extendMethods() {
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
        if (req.user.role === 'editor') {
          browserOptions.batchOperations = []
          browserOptions.quickCreate = false
          browserOptions.showCreate = false
          browserOptions.canPublish = false
        }

        return browserOptions
      },
    }
  },

  handlers(self) {
    return {
      beforeInsert: {
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

            const customers = [
              {
                email: 'henri@roland-garros.fr',
                firstName: 'Henri',
                lastName: 'Cochet',
                birthDate: '1901-12-14',
                password: 'vino01',
              },
              {
                email: 'rene@roland-garros.fr',
                firstName: 'René',
                lastName: 'Lacoste',
                birthDate: '1904-07-02',
                password: 'vino01',
              },
              {
                email: 'jean@roland-garros.fr',
                firstName: 'Jean',
                lastName: 'Borotra',
                birthDate: '1898-08-13',
                password: 'vino01',
              },
              {
                email: 'jacques@roland-garros.fr',
                firstName: 'Jacques',
                lastName: 'Brugnon',
                birthDate: '1895-05-11',
                password: 'vino01',
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
