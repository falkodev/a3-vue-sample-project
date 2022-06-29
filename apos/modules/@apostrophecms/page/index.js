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
        slug: '/itinerary',
        parkedId: 'itinerary',
        type: 'itinerary-page',
        title: 'Itinerary',
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
      {
        slug: '/domain',
        parkedId: 'domain',
        type: 'domain-page',
        title: 'Domain',
      },
      {
        slug: '/place',
        parkedId: 'place',
        type: 'place-page',
        title: 'Place',
      },
      {
        slug: '/customer',
        parkedId: 'customer',
        type: 'customer-page',
        title: 'Customer',
      },
      {
        slug: '/event',
        parkedId: 'event',
        type: 'event-page',
        title: 'Event',
      },
      {
        slug: '/events-list',
        parkedId: 'eventsList',
        type: 'events-list-page',
        title: 'EventsList',
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

        data = _super(req)

        data.labels = {
          loggedInMsg: req.t('apostrophe:loggedInMsg'),
          loggedOutMsg: req.t('apostrophe:loggedOutMsg'),
          deleteAccount: req.t('apostrophe:deleteAccount'),
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
