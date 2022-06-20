/* istanbul ignore next */
module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'apostrophe:domain',
  },

  methods() {
    return {
      beforeIndex(req) {
        req.notFound = true
      },
    }
  },
}
