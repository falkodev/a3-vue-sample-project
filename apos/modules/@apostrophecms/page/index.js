// This configures the @apostrophecms/pages module to add a "home" page type to the
// pages menu
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
      {
        slug: '/place',
        parkedId: 'place',
        type: 'place-page',
        title: 'Place',
      },
      {
        slug: '/register',
        parkedId: 'register',
        type: 'register-page',
        title: 'Register',
      },
    ],
    templateData: {
      loggedInMsg: 'loggedInMsg',
      loggedOutMsg: 'loggedOutMsg',
    },
  },
  init(self) {
    self.enableBrowserData('public')
  },
  extendMethods() {
    return {
      getBrowserData(_super, req) {
        let data = {}

        if (req.user) {
          data = _super(req)
        }

        data.labels = {
          loggedInMsg: req.t('apostrophe:loggedInMsg'),
          loggedOutMsg: req.t('apostrophe:loggedOutMsg'),
        }

        return data
      },
    }
  },
  helpers(self) {
    return {
      stringify(label) {
        return JSON.stringify(label)
      },
    }
  },
}
