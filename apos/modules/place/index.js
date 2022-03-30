const qs = require('qs')
const fs = require('fs')
const path = require('path')
const config = require('config')
const { request } = require('gaxios')

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
      image: {
        type: 'attachment',
        label: 'apostrophe:image',
        fileGroup: 'images',
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
          return doc
        },
      },

      '@apostrophecms/db:fixtures': {
        async placeFixtures(req) {
          try {
            self.apos.util.log('Starting place fixtures')

            const { url } = config.get('placesAPI')
            const searchUrlQuery = qs.stringify(url.search.querystring)
            const searchUrl = `${url.prefix}/${url.search.url}?${searchUrlQuery}`
            const searchData = await self.apos.http.get(searchUrl)

            for (const result of searchData.results) {
              const place = {
                title: result.name,
                placeType: 'wineStore',
                address: result.vicinity,
                longitude: result.geometry.location.lng,
                latitude: result.geometry.location.lat,
              }

              const photoRef = result.photos?.[0]?.photo_reference
              let image

              if (photoRef) {
                const imageName = `${result.reference}.jpg`
                const imagePath = path.resolve(__dirname, `./${imageName}`)
                try {
                  const photoUrlQuery = qs.stringify({
                    photo_reference: photoRef,
                    maxwidth: 800,
                    key: config.get('placesAPI.url.search.querystring.key'),
                  })
                  const photoUrl = `${url.prefix}/${url.photo.url}?${photoUrlQuery}`
                  const writer = fs.createWriteStream(imagePath)
                  const file = await request({
                    method: 'GET',
                    url: photoUrl,
                    responseType: 'stream',
                  })
                  file.data.pipe(writer)

                  image = await self.apos.attachment.insert(req, {
                    name: imageName,
                    path: imagePath,
                  })
                } catch (error) {
                  self.apos.util.error(error, 'Place fixtures image error')
                } finally {
                  fs.unlinkSync(imagePath)
                }
              }

              await self.insert(req, {
                ...self.newInstance(),
                ...place,
                ...(image && { image }),
                fixtures: true,
              })
            }

            self.apos.util.log('Place fixtures done')
          } catch (error) {
            self.apos.util.error(error, 'Place fixtures error')
          }
        },
      },
    }
  },
}
