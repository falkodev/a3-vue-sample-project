const path = require('path')

module.exports = {
  'component/checkbox': {},
  'component/popup': {
    webpack: {
      extensions: {
        popupAlias: {
          resolve: {
            alias: {
              '@/popup': path.join(__dirname, './popup/public'),
            },
          },
        },
      },
    },
  },
  'component/home-redirect': {
    options: {
      ignoreNoCodeWarning: true,
    },
  },
  'component/locale-switcher': {},
  'component/wine-labels': {},
  'component/snackbar': {
    webpack: {
      extensions: {
        snackbarAlias: {
          resolve: {
            alias: {
              '@/snackbar': path.join(__dirname, './snackbar/public'),
            },
          },
        },
      },
    },
  },
}
