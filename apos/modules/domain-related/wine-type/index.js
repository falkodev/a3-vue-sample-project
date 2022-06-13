const { setDefaultItems } = require('../common')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'wineType',
    label: 'apostrophe:wineType.label',
    pluralLabel: 'apostrophe:wineType.pluralLabel',
    localized: true,
    quickCreate: false,
  },

  methods(self) {
    return {
      async setDefaultWineTypes() {
        try {
          await setDefaultItems(self, 'wineTypes', 'wine-type')
        } catch (error) {
          self.apos.util.error(`Default wine types error: ${error}`)
        }
      },
    }
  },

  tasks(self) {
    /* istanbul ignore next */
    return {
      defaults: {
        usage: 'npm run task -- domain-related/wine-type:defaults',
        async task() {
          await self.setDefaultWineTypes()
        },
      },
    }
  },

  handlers(self) {
    return {
      '@apostrophecms/db:defaults': {
        async addDefaults() {
          await self.setDefaultWineTypes()
        },
      },
    }
  },
}
