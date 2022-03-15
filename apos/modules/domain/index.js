module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'domain',
    label: 'apostrophe:domain',
    localized: false,
  },
  fields: {
    add: {
      _events: {
        type: 'relationship',
      },
      _customers: {
        type: 'relationship',
      },
    },
    group: {
      basics: {
        fields: ['_events', '_customers'],
      },
    },
  },
  handlers(self) {
    return {
      '@apostrophecms/db:fixtures': {
        async domainFixtures(req) {
          self.apos.util.log('Starting domain fixtures')
        },
      },
    }
  },
}
