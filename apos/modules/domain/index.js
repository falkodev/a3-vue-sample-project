const path = require('path')
const asyncFs = require('fs/promises')

module.exports = {
  extend: 'place',

  options: {
    alias: 'domain',
    label: 'apostrophe:domainType.label',
    pluralLabel: 'apostrophe:domainType.pluralLabel',
    localized: true,
    quickCreate: false,
  },

  fields: {
    add: {
      description: {
        type: 'area',
        options: {
          'collapse-rich-text': {},
          max: 1,
        },
      },
      isAutoGuidedVisit: {
        label: 'apostrophe:autoGuidedVisit',
        type: 'boolean',
      },
      eShop: {
        type: 'url',
        label: 'apostrophe:eShop',
      },
      _visits: {
        type: 'relationship',
        withType: 'visit',
      },

      visitPrice: {
        type: 'area',
        label: 'apostrophe:visitPriceSimple',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
          },
          max: 1,
        },
      },
      activities: {
        type: 'area',
        label: 'apostrophe:activity.pluralLabel',
        options: {
          widgets: {
            'domain-related/activity': {},
          },
          max: 1,
        },
      },
      conveniences: {
        type: 'area',
        label: 'apostrophe:convenience.pluralLabel',
        options: {
          widgets: {
            'domain-related/convenience': {},
          },
          max: 1,
        },
      },
      wineLabels: {
        type: 'area',
        label: 'apostrophe:wineLabel.pluralLabel',
        options: {
          widgets: {
            'domain-related/wine-label': {},
          },
          max: 1,
        },
      },
      wineTypes: {
        type: 'area',
        label: 'apostrophe:wineType.pluralLabel',
        options: {
          widgets: {
            'domain-related/wine-type': {},
          },
          max: 1,
        },
      },
      track: {
        type: 'attachment',
        label: 'apostrophe:visit.track.label',
        max: 1,
        fileGroup: 'geojson',
      },
      visitSteps: {
        type: 'array',
        label: 'apostrophe:visit.label',
        min: 1,
        fields: {
          add: {
            name: {
              type: 'string',
              label: 'apostrophe:visit.subLabel',
              required: true,
            },
            timeLength: {
              type: 'integer',
              label: 'apostrophe:visit.duration',
            },
            subSteps: {
              type: 'array',
              label: 'apostrophe:visit.subStep.label',
              fields: {
                add: {
                  name: {
                    type: 'string',
                    help: 'apostrophe:visit.subStep.help',
                    label: 'apostrophe:visit.subStep.title',
                    required: true,
                  },
                  _image: {
                    label: 'Image',
                    type: 'relationship',
                    withType: '@apostrophecms/image',
                    max: 1,
                    group: ['image'],
                  },
                  downloadable: {
                    type: 'boolean',
                    label: 'apostrophe:visit.subStep.downloadable',
                  },
                },
              },
            },
          },
        },
      },
    },
    remove: ['placeType'],

    group: {
      basics: {
        fields: ['isAutoGuidedVisit', 'eShop', 'visitPrice'],
      },
      widgets: {
        fields: ['activities', 'conveniences', 'wineLabels', 'wineTypes'],
      },
      visits: {
        fields: ['visits'],
      },
      visit: {
        label: 'apostrophe:visit.label',
        fields: ['visitSteps', 'track'],
      },
    },
  },

  columns: {
    remove: ['placeType'],
  },

  filters: {
    remove: ['placeType'],
  },

  extendMethods() {
    /* istanbul ignore next */
    return {
      getRestQuery(_super, req) {
        const query = _super(req)
        if (req.user.role === 'editor') {
          query._ids([`${req.user.domainIds[0]}:fr:published`])
        }
        return query
      },
    }
  },

  methods(self) {
    return {
      async getDomains({ force }) {
        try {
          if (!process.env.NODE_APP_INSTANCE) {
            throw new Error('Missing NODE_APP_INSTANCE environment variable!')
          }

          self.apos.util.log('Getting domains')

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
            await self.apos.place.fetchPlaces(self.name, [self.name], assetsDir)
          } else {
            await self.apos.place.createPlacesFromData(
              self.name,
              assetsDir,
              dataFile,
            )
          }

          /* istanbul ignore next */
          self.apos.util.log('Domains updated')
        } catch (error) {
          self.apos.util.error(error)
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
        usage: 'npm run task -- domain:fetch --force=true',
        async task({ force = false }) {
          await self.getDomains({ force })
        },
      },
    }
  },
}
