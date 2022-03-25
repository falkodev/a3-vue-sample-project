const qs = require('qs')
const config = require('config')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'place',
    label: 'apostrophe:place.label',
    pluralLabel: 'apostrophe:place.pluralLabel',
    localized: false,
  },
  fields: {
    add: {
      placeType: {
        type: 'select',
        label: 'apostrophe:place.type',
        choices: [
          {
            label: '',
            value: null,
          },
          {
            label: 'apostrophe:place.wineStore',
            value: 'wineStore',
          },
          {
            label: 'apostrophe:place.restaurant',
            value: 'restaurant',
          },
          {
            label: 'apostrophe:place.poi',
            value: 'poi',
          },
          {
            label: 'apostrophe:place.domain',
            value: 'domain',
          },
        ],
        def: null,
        required: true,
      },
      address: {
        type: 'string',
        label: 'apostrophe:address',
      },
      longitude: {
        type: 'float',
        required: true,
      },
      latitude: {
        type: 'float',
        required: true,
      },
    },
    group: {
      basics: {
        fields: ['placeType', 'address', 'longitude', 'latitude'],
      },
    },
  },
  columns: {
    add: {
      placeType: {
        label: 'apostrophe:place.type',
      },
    },
  },
  filters: {
    add: {
      placeType: {
        label: 'apostrophe:place.type',
      },
    },
  },
  handlers(self) {
    return {
      beforeSave: {
        convertCoordinatesToGeoJSONPoint(req, doc) {
          doc.geoLocation = {
            type: 'Point',
            coordinates: [doc.longitude, doc.latitude],
          }
        },
      },

      '@apostrophecms/db:fixtures': {
        async placeFixtures(req) {
          try {
            self.apos.util.log('Starting place fixtures')

            const { url, querystring, headers } = config.get('placesAPI')
            const urlQuery = qs.stringify(querystring)
            const finalUrl = `${url}?${urlQuery}`
            const data = await self.apos.http.get(finalUrl, { headers })

            //TODO: place image
            await Promise.all(
              data.results.map((result) => {
                const place = {
                  title: result.name,
                  placeType: 'wineStore',
                  address: result.location.formatted_address,
                  longitude: result.geocodes.main.longitude,
                  latitude: result.geocodes.main.latitude,
                }

                return self.insert(req, {
                  ...self.newInstance(),
                  ...place,
                  fixtures: true,
                })
              }),
            )

            self.apos.util.log('Place fixtures done')
          } catch (error) {
            self.apos.util.error(
              `Place fixtures error: ${error?.body?.message || error?.message}`,
            )
          }
        },
      },
    }
  },
}
