module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'apostrophe:place',
  },

  methods() {
    return {
      beforeIndex(req) {
        req.notFound = true
      },
    }
  },
}
