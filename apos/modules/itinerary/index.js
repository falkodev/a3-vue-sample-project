module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'itinerary',
    label: 'apostrophe:itinerary.label',
    pluralLabel: 'apostrophe:itinerary.pluralLabel',
    localized: false,
  },
  fields: {
    add: {
      itineraryType: {
        type: 'select',
        label: 'apostrophe:itinerary.type',
        choices: [
          {
            label: '',
            value: null,
          },
          {
            label: 'apostrophe:itinerary.event',
            value: 'event',
          },
          {
            label: 'apostrophe:itinerary.theme',
            value: 'theme',
          },
          {
            label: 'apostrophe:itinerary.syndicate',
            value: 'syndicate',
          },
        ],
        def: null,
        required: true,
      },
      startDate: {
        type: 'date',
        required: true,
        label: 'apostrophe:startDate',
      },
      endDate: {
        type: 'date',
        label: 'apostrophe:endDate',
      },
      startTime: {
        type: 'time',
        label: 'apostrophe:startTime',
      },
      endTime: {
        type: 'time',
        label: 'apostrophe:endTime',
      },
      duration: {
        type: 'time',
        required: true,
        label: 'apostrophe:duration',
      },
      mileage: {
        type: 'float',
        required: true,
        label: 'apostrophe:mileage',
      },
      description: {
        type: 'string',
        textarea: true,
      },
      price: {
        type: 'float',
        required: true,
        label: 'apostrophe:price',
      },
      steps: {
        type: 'array',
        label: 'apostrophe:steps',
        fields: {
          add: {
            _place: {
              //TODO: when an order is created, check its matching itinerary, get steps with "domain" place and add them to the order
              type: 'relationship',
              label: 'apostrophe:place.label',
            },
          },
        },
      },
    },
    group: {
      basics: {
        fields: ['itineraryType', 'description', 'price'],
      },
      scheduling: {
        label: 'apostrophe:scheduling',
        fields: [
          'startDate',
          'endDate',
          'startTime',
          'endTime',
          'duration',
          'mileage',
        ],
      },
      steps: {
        label: 'apostrophe:steps',
        fields: ['steps'],
      },
    },
  },
}
