module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'event',
    label: 'apostrophe:event',
    localized: false,
  },
  fields: {
    add: {
      date: {
        type: 'date',
        required: true,
      },
      description: {
        type: 'string',
        textarea: true,
      },
      price: {
        type: 'float',
      },
      _domain: {
        type: 'relationship',
      },
    },
    group: {
      basics: {
        fields: ['date', 'description', 'price'],
      },
    },
  },
  filters: {
    add: {
      _domain: {
        label: 'apostrophe:domain',
      },
    },
  },
}
