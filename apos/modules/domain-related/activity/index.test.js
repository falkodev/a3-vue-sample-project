const activity = require('./index')
const config = require('config')
const self = require('apostrophe')

describe('activity', () => {
  self.setDefaultActivities = jest.fn()
  self.insert = jest.fn()
  self.newInstance = jest.fn()
  self.localize = jest.fn()
  self.find = () => {
    return {
      toCount: jest.fn().mockImplementation(() => 0),
    }
  }
  self.apos = {
    i18n: {
      locales: {
        fr: {
          label: 'Français',
          prefix: '/fr',
        },
        en: {
          label: 'English',
          prefix: '/en',
        },
      },
      defaultLocale: 'fr',
    },
    util: {
      log: jest.fn(),
      error: jest.fn(),
      slugify: jest.fn(),
    },
    error: jest.fn(),
    task: {
      getReq: jest.fn().mockImplementation(() => {
        return {
          user: jest.fn(),
          t: jest.fn(),
        }
      }),
    },
    attachment: {
      insert: jest.fn(),
    },
  }

  test('default task is run', async () => {
    const runDefault = activity.handlers(self)['@apostrophecms/db:defaults']
    await runDefault.addDefaults({})
    expect(self.setDefaultActivities).toHaveBeenCalled()
  })

  test('default activities feed the db', async () => {
    const methods = activity.methods(self)
    await methods.setDefaultActivities()
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.apos.attachment.insert).toHaveBeenCalled()
    expect(self.insert).toHaveBeenCalled()
  })

  test('no feed if existing activities', async () => {
    self.find = () => {
      return {
        toCount: jest.fn().mockImplementation(() => 1),
      }
    }
    const methods = activity.methods(self)
    await methods.setDefaultActivities()
    expect(self.apos.util.log).toHaveBeenCalled()

    self.find = () => {
      return {
        toCount: jest.fn().mockImplementation(() => {
          throw new Error('test')
        }),
      }
    }
    expect(self.apos.util.error).toHaveBeenCalled()
  })
})
