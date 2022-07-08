/* istanbul ignore next */
module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'apostrophe:event.label',
  },

  methods() {
    return {
      beforeIndex(req) {
        req.notFound = true
      },
    }
  },
}
