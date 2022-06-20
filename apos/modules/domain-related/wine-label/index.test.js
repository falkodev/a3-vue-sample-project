const wineLabel = require('./index')
const self = require('apostrophe')

describe('wine-label', () => {
  self.setDefaultWineLabels = jest.fn()
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
  }

  test('default task is run', async () => {
    const runDefault = wineLabel.handlers(self)['@apostrophecms/db:defaults']
    await runDefault.addDefaults()
    expect(self.setDefaultWineLabels).toHaveBeenCalled()
  })

  test('default wine labels feed the db', async () => {
    const methods = wineLabel.methods(self)
    await methods.setDefaultWineLabels()
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.insert).toHaveBeenCalled()
  })

  test('no feed if existing wine labels', async () => {
    self.find = () => {
      return {
        toCount: jest.fn().mockImplementation(() => 1),
      }
    }
    const methods = wineLabel.methods(self)
    await methods.setDefaultWineLabels()
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
