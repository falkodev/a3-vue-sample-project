const moment = require('moment')

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
      beforeShow(req) {
        if (req.data.piece.duration) {
          req.data.piece.duration = moment(
            req.data.piece.duration,
            'H:mm',
          ).format('H:mm')
        }

        if (req.data.piece.steps?.length) {
          req.data.piece.steps = req.data.piece.steps.map((step) => {
            step.place =
              step.stepType === 'place' ? step._place[0] : step._domain[0]
            return step
          })
        }
      },
    }
  },
}
