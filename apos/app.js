const config = require('config')
const appName = process.env.NODE_APP_INSTANCE
  ? `vino-terr-${process.env.NODE_APP_INSTANCE}`
  : 'vino-terr'

require('apostrophe')({
  shortName: appName,
  // autoBuild: false,
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
        className: 'bp-rich-text',
      },
    },
    '@apostrophecms/image-widget': {
      options: {
        className: 'bp-image-widget',
      },
    },
    '@apostrophecms/video-widget': {
      options: {
        className: 'bp-video-widget',
      },
    },
    // `asset` supports the project's webpack build for client-side assets.
    asset: {},
    // The project's first custom page type.
    'default-page': {},
    content: {},
    domain: {},
    itinerary: {},
    customer: {},
    order: {},
    place: {},
  },
})
