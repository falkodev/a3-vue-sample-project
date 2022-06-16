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
        if (!req.user) {
          req.redirect = '/login?redirect=' + req.url
        }

        if (req.data.piece.duration) {
          req.data.piece.duration = moment(req.data.piece.duration, 'H:mm').format('H:mm')
        }

        req.data.piece.steps = req.data.piece.steps || []
        for (const step of req.data.piece.steps) {
          step.place = step._place?.length
            ? step._place[0]
            : step._domain?.length
            ? step._domain[0]
            : null

          if (step.place) {
            step.nearDomains = await self.apos.domain
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
              .project({ title: 1, image: 1, latitude: 1, longitude: 1 })
              .toArray()
          }
        }
      },
    }
  },
}
