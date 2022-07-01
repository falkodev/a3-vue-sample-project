/* istanbul ignore next */
module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{txt,js,css,png,jpg}'],
  globIgnores: ['assets/*'],
  swDest: 'public/sw.js',
  swSrc: 'modules/content/public/sw.js',
}
