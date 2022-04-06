const customer = require('./index')
const self = require('apostrophe')

describe('customer', () => {
  self.insert = jest.fn()
  self.newInstance = jest.fn()
  self.apos = {
    user: {
      insert: jest.fn(),
    },
    util: {
      log: jest.fn(),
      error: jest.fn(),
    },
    db: {
      collection: jest.fn().mockImplementation(() => {
        return {
          deleteMany: jest.fn(),
        }
      }),
    },
  }

  const doc = {
    email: 'roland@gmail.com',
    firstName: 'Roland',
    lastName: 'Garros',
    birthDate: '1888-10-06',
    password: 'vino01',
    fixtures: true,
  }

  const beforeInsert = customer.handlers(self).beforeInsert
  test('cannot be created if no user', () => {
    expect(() => beforeInsert.checkPermissions({}, doc)).toThrow(
      new Error('unauthorized'),
    )
  })
  test('cannot be created if user is not admin', () => {
    expect(() =>
      beforeInsert.checkPermissions(
        {
          user: {
            role: 'editor',
          },
        },
        doc,
      ),
    ).toThrow(new Error('unauthorized'))
  })

  test('is created if user is admin', async () => {
    await beforeInsert.createUser(
      {
        user: {
          role: 'admin',
        },
      },
      doc,
    )
    expect(self.apos.user.insert).toHaveBeenCalled()
  })

  test('legal age should be valid', () => {
    expect(beforeInsert.checkLegalAge({}, doc)).toBe(true)
  })

  test('cannot be created if legal age not valid', () => {
    const newDoc = { ...doc }
    newDoc.birthDate = new Date()
    expect(() => beforeInsert.checkLegalAge({}, newDoc)).toThrow(
      new Error('invalid birth date'),
    )
  })

  test('title is inferred from first and last names', () => {
    expect(beforeInsert.titleCustomer({}, doc)).toEqual({
      ...doc,
      title: 'Roland Garros',
    })
  })

  test('a user is automatically created', async () => {
    await beforeInsert.createUser({}, doc)
    expect(self.apos.user.insert).toHaveBeenCalled()
  })

  test('the password is removed from the customer', () => {
    expect(beforeInsert.removePassword({}, doc)).not.toHaveProperty('password')
  })

  test('fixtures are run', async () => {
    const runFixtures = customer.handlers(self)['@apostrophecms/db:fixtures']
    await runFixtures.customerFixtures({})
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.apos.db.collection).toHaveBeenCalled()
    expect(self.insert).toHaveBeenCalled()

    self.apos.db = {}
    await runFixtures.customerFixtures({})
    expect(self.apos.util.error).toHaveBeenCalled()
  })
})
