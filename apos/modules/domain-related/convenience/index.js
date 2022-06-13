const { setDefaultItems } = require('../common')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'convenience',
    label: 'apostrophe:convenience.label',
    pluralLabel: 'apostrophe:convenience.pluralLabel',
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
      async setDefaultConveniences() {
        try {
          await setDefaultItems(self, 'conveniences', 'convenience')
        } catch (error) {
          self.apos.util.error(`Default conveniences error: ${error}`)
        }
      },
    }
  },

  tasks(self) {
    /* istanbul ignore next */
    return {
      defaults: {
        usage: 'npm run task -- domain-related/convenience:defaults',
        async task() {
          await self.setDefaultConveniences()
        },
      },
    }
  },

  handlers(self) {
    return {
      '@apostrophecms/db:defaults': {
        async addDefaults() {
          await self.setDefaultConveniences()
        },
      },
    }
  },
}
