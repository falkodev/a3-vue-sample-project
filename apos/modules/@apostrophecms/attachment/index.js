module.exports = {
  options: {
    fileGroups: [
      // copier ici les 2 autres objets issus de la config par défaut - à trouver plus haut dans la conversation slack
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
        // uploadfs should just accept this file as-is
        image: false,
      },
      {
        name: 'geojson',
        label: 'apostrophe:geoJson',
        extensions: ['geoJson'],
        image: false,
      },
    ],
  },
}
