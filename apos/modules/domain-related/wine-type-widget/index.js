module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'apostrophe:wineType.pluralLabel',
  },
  fields: {
    add: {
      _wineTypes: {
        type: 'relationship',
        withType: 'domain-related/wine-type',
        label: 'apostrophe:wineType.pluralLabel',
      },
    },
  },
}
