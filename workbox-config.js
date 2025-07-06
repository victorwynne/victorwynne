module.exports = {
  globDirectory: '_site/',
  globPatterns: [
    '**/*.{html,css,js,png,jpg,jpeg,gif,svg,ico,xml,json}'
  ],
  swDest: '_site/sw.js',
  ignoreURLParametersMatching: [
    /^utm_/,
  ],
  importScripts: ['/OneSignalSDKWorker.js'], 
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'images-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:js|css)$/,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-resources-cache',
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ url }) => url.origin === self.location.origin,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'html-pages-cache',
    },
  }]
};
