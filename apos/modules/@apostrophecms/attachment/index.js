module.exports = {
  options: {
    fileGroups: [
      {
        name: 'images',
        label: 'apostrophe:images',
        extensions: ['gif', 'jpg', 'png', 'svg'],
        extensionMaps: { jpeg: 'jpg' },
        // uploads should treat this as an image and create scaled versions
        image: true,
      },
      {
        name: 'office',
        label: 'apostrophe:office',
        extensions: [
          'txt',
          'rtf',
          'pdf',
          'xls',
          'ppt',
          'doc',
          'pptx',
          'sldx',
          'ppsx',
          'potx',
          'xlsx',
          'xltx',
          'csv',
          'docx',
          'dotx',
        ],
        extensionMaps: {},
        // uploads should just accept this file as-is
        image: false,
      },
      {
        name: 'geojson',
        label: 'apostrophe:geoJson',
        extensions: ['geojson'],
        extensionMaps: {},
        image: false,
      },
    ],
  },
}
