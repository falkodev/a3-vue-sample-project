module.exports = {
  extend: '@apostrophecms/piece-page-type',

  options: {
    label: 'Itinerary Page',
  },

  methods() {
    return {
      beforeIndex(req) {
        req.notFound = true
      },
    }
  },
}
