const config = require('config')
const appName = process.env.NODE_APP_INSTANCE
  ? `vino-terr-${process.env.NODE_APP_INSTANCE}`
  : 'vino-terr'

require('apostrophe')({
  shortName: appName,
  nestedModuleSubdirs: true,
  modules: {
    // Apostrophe module configuration
    // *******************************
    //
    // NOTE: most configuration occurs in the respective modules' directories.
    // See modules/@apostrophecms/page/index.js for an example.
    //
    // Any modules that are not present by default in Apostrophe must at least
    // have a minimal configuration here to turn them on: `moduleName: {}`
    // ***********************************************************************
    // `className` options set custom CSS classes for Apostrophe core widgets.
    '@apostrophecms/db': {
      options: {
        uri:
          process.env.HOST === 'docker'
            ? config.get('mongoDB.dockerUri')
            : config.get('mongoDB.uri'),
      },
    },
    '@apostrophecms/rich-text-widget': {
      options: {
        className: 't-rich-text',
        defaultOptions: {
          styles: [
            {
              tag: 'p',
              label: 'apostrophe:richText',
            },
          ],
        },
      },
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 't-image-widget',
      },
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 't-video-widget',
      },
    },
    // The project's first custom page type.
    'default-page': {},
    place: {},
    'place-page': {},
    domain: {},
    'domain-page': {},
    'register-page': {},
    component: {
      options: {
        ignoreNoCodeWarning: true,
      },
    },
    'domain-related': {
      options: {
        ignoreNoCodeWarning: true,
      },
    },
    content: {},
    itinerary: {},
    customer: {},
    'customer-page': {},
    order: {},
    'collapse-rich-text-widget': {
      extend: '@apostrophecms/rich-text-widget',
    },
    visit: {},
  },
})
