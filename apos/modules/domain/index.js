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
        label: 'Basics',
        fields: ['_events', '_customers'],
      },
    },
  },
}
