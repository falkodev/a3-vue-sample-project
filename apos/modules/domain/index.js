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

  async init(self) {
    await self.apos.doc.db.createIndex({
      geoLocation: '2dsphere',
    })
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
      eShop: {
        type: 'url',
        label: 'apostrophe:eShop',
      },
      reception: {
        type: 'boolean',
        label: 'apostrophe:reception',
        def: false,
      },

      isAutoGuidedVisit: {
        type: 'boolean',
        label: 'apostrophe:autoGuidedVisit',
        if: {
          reception: true,
        },
      },

      openingDaysAndHours: {
        label: 'apostrophe:openingDaysAndHours',
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
          },
          max: 1,
        },
        if: {
          reception: true,
        },
      },

      phoneNumberAppointment: {
        type: 'area',
        label: 'apostrophe:phoneNumberAppointment',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
          },
          max: 1,
        },
        if: {
          reception: true,
        },
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
        if: {
          reception: true,
        },
      },

      _visits: {
        type: 'relationship',
        withType: 'visit',
        if: {
          reception: true,
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
        if: {
          reception: true,
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
        if: {
          reception: true,
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
    },
    remove: ['placeType'],

    group: {
      basics: {
        fields: ['eShop'],
      },
      wineAndLabel: {
        label: 'apostrophe:wineAndLabel',
        fields: ['wineLabels', 'wineTypes'],
      },
      receptionInformations: {
        label: 'apostrophe:receptionInformations',
        fields: [
          'reception',
          'isAutoGuidedVisit',
          'phoneNumberAppointment',
          'openingDaysAndHours',
          'visitPrice',
          'activities',
          'conveniences',
        ],
      },
      visits: {
        label: 'apostrophe:visits',
        fields: ['_visits'],
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
