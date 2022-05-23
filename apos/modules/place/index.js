const qs = require('qs')
const fs = require('fs')
const path = require('path')
const config = require('config')
const { request } = require('gaxios')
const asyncFs = require('fs/promises')

const categories = [
  {
    label: 'apostrophe:domain',
    value: 'domain',
    searchTerm: 'vignoble',
  },
  {
    label: 'apostrophe:wineStore',
    value: 'wineStore',
    searchTerm: 'caviste',
  },
  {
    label: 'apostrophe:wineBar',
    value: 'wineBar',
    searchTerm: 'bar à vins',
  },
  {
    label: 'apostrophe:poi',
    value: 'poi',
    searchTerm: "lieu d'intérêt",
  },
]

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
        choices: 'setChoices',
        def: null,
        required: true,
      },
      visit: {
        type: 'array',
        label: 'apostrophe:visit.label',
        min: 1,
        if: {
          placeType: 'domain',
        },
        fields: {
          add: {
            name: {
              type: 'string',
              label: 'apostrophe:visit.sublabel',
            },
          },
        },
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
      labels: {
        type: 'array',
        titleField: 'name',
        fields: {
          add: {
            name: {
              type: 'string',
            },
          },
        },
      },
    },
    group: {
      basics: {
        fields: [
          'placeType',
          'address',
          'longitude',
          'latitude',
          'image',
          'labels',
        ],
      },
      visit: {
        label: 'apostrophe:visit.label',
        fields: ['visit'],
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
  init(self) {
    /* istanbul ignore next */
    self.apos.migration.add('feed-places', () =>
      self.getPlaces({ force: false }),
    )
  },
  components(self) {
    /* istanbul ignore next */
    return {
      async categories(req, data) {
        const result = await Promise.all([
          ...categories.map((category) =>
            self.find(req, { placeType: category.value }).limit(5).toArray(),
          ),
          self.apos.itinerary.find(req).limit(5).toArray(),
        ])

        return { result }
      },
    }
  },
  extendMethods() {
    /* istanbul ignore next */
    return {
      getRestQuery(_super, req) {
        const query = _super(req)
        if (req.user.role === 'editor') {
          query._ids([req.user.domainIds[0]])
        }
        return query
      },
    }
  },

  components(self) {
    return {
      async categories(req, data) {
        const result = await Promise.all([
          ...categories.map((category) =>
            self.find(req, { placeType: category.value }).limit(5).toArray(),
          ),
          self.apos.itinerary.find(req).limit(5).toArray(),
        ])

        return { result }
      },
    }
  },

  methods(self) {
    return {
      setChoices() {
        return [
          {
            label: '',
            value: null,
          },
          ...categories.map(({ label, value }) => ({ label, value })),
        ]
      },

      async getPlaces({ force }) {
        try {
          if (!process.env.NODE_APP_INSTANCE) {
            throw new Error('Missing NODE_APP_INSTANCE environment variable!')
          }

          self.apos.util.log('Getting places')

          const assetsDir = path.resolve(
            __dirname,
            `./domains/${process.env.NODE_APP_INSTANCE}`,
          )

          await asyncFs.mkdir(assetsDir, { recursive: true })

          const dataFile = await asyncFs.readFile(
            `${assetsDir}/data.json`,
            'utf8',
          )

          if (!dataFile || force) {
            await self.fetchPlaces(assetsDir)
          } else {
            await self.createPlacesFromData(assetsDir, dataFile)
          }

          /* istanbul ignore next */
          self.apos.util.log('Places updated')
        } catch (error) {
          self.apos.util.error(error)
        }
      },

      async fetchPlaces(assetsDir) {
        const places = []
        const req = self.apos.task.getReq()
        const { url } = config.get('placesAPI')

        const imageFolder = `${assetsDir}/images`
        await asyncFs.mkdir(imageFolder, { recursive: true })
        const existingImages = await asyncFs.readdir(imageFolder)
        for (const existingImage of existingImages) {
          await asyncFs.unlink(path.join(imageFolder, existingImage))
        }

        for (const category of categories) {
          const searchUrlQuery = qs.stringify({
            ...url.search.querystring,
            keyword: category.searchTerm,
          })
          const searchUrl = `${url.prefix}/${url.search.url}?${searchUrlQuery}`
          const searchData = await self.apos.http.get(searchUrl)
          self.apos.util.log(
            `Places fetched for ${category.value}. Saving them in DB...`,
          )

          for (const result of searchData.results) {
            const photoRef = result.photos?.[0]?.photo_reference
            const place = {
              ...self.newInstance(),
              title: result.name,
              placeType: category.value,
              address: result.vicinity,
              longitude: result.geometry.location.lng,
              latitude: result.geometry.location.lat,
              ...(photoRef && { photoRef }),
            }

            let image
            /* istanbul ignore next */
            if (photoRef) {
              const imageName = `${self.apos.util.slugify(result.name)}.jpg`
              const imagePath = `${assetsDir}/images/${imageName}`

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

                place.image = image
              } catch (error) {
                self.apos.util.error(error, 'Place fixtures image error')
              }
            }

            await self.insert(req, place)
            places.push(place)
          }
        }

        self.apos.util.log('Writing data to file')
        const data = JSON.stringify(places, null, 2)
        await asyncFs.writeFile(`${assetsDir}/data.json`, data)
      },

      async createPlacesFromData(assetsDir, dataFile) {
        const req = self.apos.task.getReq()
        const existingPlaces = await self.find(req).toArray()

        if (!existingPlaces.length) {
          self.apos.util.log('Reading data from file...')
          const places = JSON.parse(dataFile)
          for (const place of places) {
            if (place.image) {
              const imageName = `${place.image.name}.${place.image.extension}`
              const imagePath = `${assetsDir}/images/${imageName}`
              const image = await self.apos.attachment.insert(req, {
                name: imageName,
                path: imagePath,
              })
              place.image = image
            }
            await self.insert(req, place)
          }
        }
      },
    }
  },
  handlers() {
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
    }
  },
  tasks(self) {
    /* istanbul ignore next */
    return {
      fetch: {
        usage: 'npm run task --prefix apos -- place:fetch --force=true',
        async task({ force = false }) {
          await self.getPlaces({ force })
        },
      },
    }
  },
}
