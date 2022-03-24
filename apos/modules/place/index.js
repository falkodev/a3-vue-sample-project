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
            label: 'apostrophe:place.wineShop',
            value: 'wineShop',
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
  handlers() {
    return {
      beforeSave: {
        convertCoordinatesToGeoJSONPoint(req, doc) {
          doc.geoLocation = {
            type: 'Point',
            coordinates: [doc.longitude, doc.latitude],
          }
        },
      },
    }
  },
}
