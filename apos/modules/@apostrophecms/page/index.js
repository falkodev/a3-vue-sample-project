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
        slug: '/register',
        parkedId: 'register',
        type: 'register-page',
        title: 'Register',
      },
      {
        slug: '/domain',
        parkedId: 'domain',
        type: 'domain-page',
        title: 'Domain',
      },
    ],
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
}
