const path = require('path')

module.exports = {
  'component/checkbox': {},
  'component/home-redirect': {},
  'component/locale-switcher': {},
  'component/snackbar': {
    webpack: {
      extensions: {
        utilsAlias: {
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
