const path = require('path')

module.exports = {
  'component/checkbox': {},
  'component/popup': {},
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
        utilsAlias: {
          resolve: {
            alias: {
              '@/snackbar': path.join(__dirname, './snackbar/public'),
              '@/popup': path.join(__dirname, './popup/public'),
            },
          },
        },
      },
    },
  },
}
