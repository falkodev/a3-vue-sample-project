module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'apostrophe:customer',
  },
  fields: {
    add: {
      birthDate: {
        type: 'date',
      },
    },
    group: {
      basics: {
        label: 'Basics',
        fields: ['birthDate'],
      },
    },
  },
}
