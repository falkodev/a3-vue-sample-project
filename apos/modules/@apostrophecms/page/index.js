// This configures the @apostrophecms/pages module to add a "home" page type to the
// pages menu
const config = require('config')
module.exports = {
  options: {
    types: [
      {
        name: 'default-page',
        label: 'Default',
      },
    ],
    park: [
      {
        slug: '/',
        parkedId: 'home',
        type: '@apostrophecms/home-page',
        title: 'Home',
      },
    ],

    templateData: {
      loggedInMsg: 'loggedInMsg',
      loggedOutMsg: 'loggedOutMsg',
    },
  },

  helpers(self) {
    return {
      translate(locale, label, options) {
        const req = self.apos.task.getReq({ locale })
        return req.t(`apostrophe:${label}`, options)
      },
    }
  },
}
