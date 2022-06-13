const { setDefaultItems } = require('../common')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'activity',
    label: 'apostrophe:activity.label',
    pluralLabel: 'apostrophe:activity.pluralLabel',
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
      async setDefaultActivities() {
        try {
          await setDefaultItems(self, 'activities', 'activity')
        } catch (error) {
          self.apos.util.error(`Default activities error: ${error}`)
        }
      },
    }
  },

  tasks(self) {
    /* istanbul ignore next */
    return {
      defaults: {
        usage: 'npm run task -- domain-related/activity:defaults',
        async task() {
          await self.setDefaultActivities()
        },
      },
    }
  },

  handlers(self) {
    return {
      '@apostrophecms/db:defaults': {
        async addDefaults() {
          await self.setDefaultActivities()
        },
      },
    }
  },
}
