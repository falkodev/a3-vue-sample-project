const { setDefaultItems } = require('../common')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'wineLabel',
    label: 'apostrophe:wineLabel.label',
    pluralLabel: 'apostrophe:wineLabel.pluralLabel',
    localized: true,
    quickCreate: false,
  },
  fields: {
    add: {
      color: {
        type: 'color',
        label: 'apostrophe:wineLabel.tagColor',
      },
    },
    group: {
      basics: {
        fields: ['color'],
      },
    },
  },

  methods(self) {
    return {
      async setDefaultWineLabels() {
        try {
          await setDefaultItems(self, 'wineLabels', 'wine-label')
        } catch (error) {
          self.apos.util.error(`Default wine labels error: ${error}`)
        }
      },
    }
  },

  tasks(self) {
    /* istanbul ignore next */
    return {
      defaults: {
        usage: 'npm run task -- domain-related/wine-label:defaults',
        async task() {
          await self.setDefaultWineLabels()
        },
      },
    }
  },

  handlers(self) {
    return {
      '@apostrophecms/db:defaults': {
        async addDefaults() {
          await self.setDefaultWineLabels()
        },
      },
    }
  },
}
