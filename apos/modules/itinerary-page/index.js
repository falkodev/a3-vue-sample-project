const moment = require('moment')

module.exports = {
  extend: '@apostrophecms/piece-page-type',

  options: {
    label: 'Itinerary Page',
  },

  methods(self) {
    return {
      beforeIndex(req) {
        req.notFound = true
      },
      async beforeShow(req) {
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

        for (const step of req.data.piece.steps) {
          const nearByDomains = await self.apos.domain
            .find(req, {
              geoLocation: {
                $near: {
                  $geometry: {
                    type: 'Point',
                    coordinates: [step.place.longitude, step.place.latitude],
                  },
                  $maxDistance: 10000, // in meters
                },
              },
            })
            .limit(3)
            // .project({ _id: 1, title: 1, image: 1, latitude: 1, longitude: 1 })
            .toArray()
          step.nearDomains = nearByDomains
          return step
        }
      },
    }
  },
}
