const customer = require('./index')
const self = require('apostrophe')

describe('customer', () => {
  self.insert = jest.fn()
  self.newInstance = jest.fn()
  self.apos = {
    attachment: {
      insert: jest.fn(),
    },
    user: {
      insert: jest.fn(),
    },
    util: {
      log: jest.fn(),
      error: jest.fn(),
    },
    error: jest.fn(),
    db: {
      collection: jest.fn().mockImplementation(() => {
        return {
          deleteMany: jest.fn(),
        }
      }),
    },
    task: {
      getAdminReq: jest.fn().mockImplementation(() => {
        return {
          user: jest.fn(),
        }
      }),
    },
  }

  asyncFs = {
    readdir: jest.fn(),
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
  const httpPost = customer.extendRestApiRoutes(self).post

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

  test('user is created if coming from form submission', () => {
    expect(
      beforeInsert.checkPasswordLength(
        {
          body: {
            password: 'test123',
          },
        },
        doc,
      ),
    ).toBe(true)
  })

  test('cannot be created if password is not long enough', () => {
    const newDoc = { ...doc }
    newDoc.password = '12'
    expect(() => beforeInsert.checkPasswordLength({}, newDoc)).toThrow(
      new Error('invalid password'),
    )
  })

  test('user is created if password is long enough', () => {
    expect(beforeInsert.checkPasswordLength({}, doc)).toBe(true)
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

  test('http POST user creation', async () => {
    const originalPost = () => ({})
    await httpPost(originalPost, {})
    expect(self.apos.task.getAdminReq).toHaveBeenCalled()
  })

  test('http POST user rejection with generic message', async () => {
    const originalPost = () => {
      throw new Error('invalid')
    }

    try {
      await httpPost(originalPost, {})
      expect(self.apos.error).toHaveBeenCalled()
    } catch (error) {}
  })

  test('http POST user rejection for duplicate', async () => {
    const originalPost = () => {
      throw new Error('E11000')
    }

    try {
      await httpPost(originalPost, {})
      expect(self.apos.error).toHaveBeenCalled()
    } catch (error) {}
  })

  test('http POST user rejection if invalid legal age', async () => {
    const originalPost = () => {
      throw new Error('birth')
    }

    try {
      await httpPost(originalPost, {})
      expect(self.apos.error).toHaveBeenCalled()
    } catch (error) {}
  })
})
