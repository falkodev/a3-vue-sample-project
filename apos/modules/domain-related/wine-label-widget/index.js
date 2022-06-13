module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'apostrophe:wineLabel.pluralLabel',
  },
  fields: {
    add: {
      _wineLabels: {
        type: 'relationship',
        withType: 'domain-related/wine-label',
        label: 'apostrophe:wineLabel.pluralLabel',
      },
    },
  },
}
