module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'customer',
    label: 'apostrophe:customer',
    localized: false,
  },
  fields: {
    add: {
      birthDate: {
        type: 'date',
      },
    },
    group: {
      basics: {
        fields: ['birthDate'],
      },
    },
  },
  handlers(self) {
    return {
      beforeInsert: {
        updateTitle(doc) {
          doc.title = doc.firstName + ' ' + doc.lastName
          return doc
        },
      },
    }
  },
}
