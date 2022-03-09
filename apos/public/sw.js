importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js',
)

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉')

  workbox.precaching.precacheAndRoute([
    ...[{"revision":"29f6a5b68c49e79d5271f1ca6189588e","url":"apos-frontend/default/apos-build-timestamp.txt"},{"revision":"72c7f960ed51aa637354dcd5c3d6e714","url":"apos-frontend/default/apos-build.js"},{"revision":"e5ae8264464d464e5f0a0b61b54a3e0b","url":"apos-frontend/default/apos-build.js.LICENSE.txt"},{"revision":"d41d8cd98f00b204e9800998ecf8427e","url":"apos-frontend/default/public-build.css"},{"revision":"68b329da9893e34099c7d8ad5cb9c940","url":"apos-frontend/default/public-build.js"},{"revision":"c2af7bccd9abe95313e8f3b32c167fdd","url":"apos-frontend/default/src-build.css"},{"revision":"b0b7d1c3c8bb935e6ee208a58f05794a","url":"apos-frontend/default/src-build.js"},{"revision":"7e6b1866afcf6ef79bd6e43b3c3444a0","url":"apos-frontend/releases/a17b411/default/apos-bundle.css"},{"revision":"236ea3c56766c3c9da9b5657d7cb04dc","url":"apos-frontend/releases/a17b411/default/apos-module-bundle.js"},{"revision":"b27c7a4365a7aa00c00e0c90a2dd22e8","url":"apos-frontend/releases/a17b411/default/apos-nomodule-bundle.js"},{"revision":"38202d761aa3e7683c148fe3839e052f","url":"apos-frontend/releases/a17b411/default/modules/asset/sw.js"},{"revision":"7e6b1866afcf6ef79bd6e43b3c3444a0","url":"apos-frontend/releases/a17b411/default/public-bundle.css"},{"revision":"130b4301bd7d93646f04834e10589297","url":"apos-frontend/releases/a17b411/default/public-module-bundle.js"},{"revision":"b27c7a4365a7aa00c00e0c90a2dd22e8","url":"apos-frontend/releases/a17b411/default/public-nomodule-bundle.js"}],
    {
      url: '/',
      revision: 'abcd1234',
    },
    {
      url: '/fr',
      revision: 'abcd1234',
    },
    {
      url: '/en',
      revision: 'abcd1234',
    },
  ])

  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'test-index-sw',
      cacheExpiration: {
        maxAgeSeconds: 60 * 30, // cache the news content for 30mn
      },
    }),
  )
} else {
  console.log("Boo! Workbox didn't load 😬")
}
