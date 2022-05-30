module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'apostrophe:activity.pluralLabel',
  },
  fields: {
    add: {
      _activities: {
        type: 'relationship',
        withType: 'domain-related/activity',
        label: 'apostrophe:activity.pluralLabel',
      },
    },
  },
}
