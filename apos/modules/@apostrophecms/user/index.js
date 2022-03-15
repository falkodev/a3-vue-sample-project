module.exports = {
  fields: {
    add: {
      role: {
        label: 'apostrophe:role',
        type: 'role',
        choices: [
          {
            label: 'apostrophe:customer',
            value: 'guest',
          },
          {
            label: 'apostrophe:domain',
            value: 'editor',
          },
          {
            label: 'apostrophe:syndicate',
            value: 'admin',
          },
        ],
        def: 'guest',
        required: true,
      },
    },
  },
  handlers(self) {
    return {
      '@apostrophecms/db:fixtures': {
        async userFixtures(req) {
          try {
            self.apos.util.log('Starting user fixtures')

            const userTypes = [
              { role: 'admin', title: 'Syndicat', username: 'syndicat' },
              {
                role: 'editor',
                title: 'Domaine 1',
                username: 'domaine1',
              },
              {
                role: 'guest',
                title: 'Client 1',
                username: 'client1',
              },
            ]

            const usersCollection = self.apos.db.collection('aposUsersSafe')
            await usersCollection.deleteMany({
              username: { $in: userTypes.map((userType) => userType.username) },
            })
            await Promise.all(
              userTypes.map((userType) =>
                self.insert(req, {
                  ...self.newInstance(),
                  ...userType,
                  fixtures: true,
                  password: 'vino01',
                }),
              ),
            )

            self.apos.util.log('User fixtures done')
          } catch (error) {
            self.apos.util.error(`User fixtures error: ${error}`)
          }
        },
      },
    }
  },
}
