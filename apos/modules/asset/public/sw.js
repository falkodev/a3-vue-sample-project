importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js',
)

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉')

  workbox.precaching.precacheAndRoute([
    ...self.__WB_MANIFEST,
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
