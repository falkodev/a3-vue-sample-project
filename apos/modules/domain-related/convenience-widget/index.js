module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'apostrophe:convenience.pluralLabel',
  },
  fields: {
    add: {
      _conveniences: {
        type: 'relationship',
        withType: 'domain-related/convenience',
        label: 'apostrophe:convenience.pluralLabel',
      },
    },
  },
}
