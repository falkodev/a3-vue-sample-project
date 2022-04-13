module.exports = {
  fields: {
    add: {
      logo: {
        type: 'attachment',
        label: 'apostrophe:logoLabel',
      },
      backgroundImage: {
        type: 'attachment',
        label: 'apostrophe:backgroundImageLabel',
      },
    },
    group: {
      basics: {
        label: 'apostrophe:customImagesLabel',
        fields: ['logo', 'backgroundImage'],
      },
    },
  },
}
