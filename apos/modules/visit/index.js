/* istanbul ignore next */
module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'visit',
    label: 'apostrophe:visitType.label',
    pluralLabel: 'apostrophe:visitType.pluralLabel',
    slugPrefix: 'vi-',
    localized: true,
    quickCreate: false,
  },

  fields: {
    add: {
      track: {
        type: 'attachment',
        label: 'apostrophe:visitType.track',
        max: 1,
        fileGroup: 'geojson',
      },
      image: {
        type: 'attachment',
        label: 'apostrophe:visitType.image',
        fileGroup: 'images',
      },
      steps: {
        type: 'array',
        label: 'apostrophe:visitType.step.pluralStep',
        min: 1,
        fields: {
          add: {
            title: {
              type: 'string',
              label: 'apostrophe:visitType.step.title',
            },
            subSteps: {
              type: 'array',
              label: 'apostrophe:visitType.subStep.pluralSubStep',
              min: 1,
              fields: {
                add: {
                  title: {
                    type: 'string',
                    label: 'apostrophe:visitType.subStep.title',
                  },
                  duration: {
                    type: 'time',
                    label: 'apostrophe:visitType.subStep.duration',
                  },
                  mileage: {
                    type: 'integer',
                    label: 'apostrophe:visitType.subStep.mileage',
                  },
                  image: {
                    type: 'attachment',
                    label: 'apostrophe:visitType.subStep.image',
                    fileGroup: 'images',
                  },
                  contents: {
                    type: 'array',
                    label: 'apostrophe:visitType.content.pluralContent',
                    min: 1,
                    max: 1,
                    fields: {
                      add: {
                        title: {
                          type: 'string',
                          label: 'apostrophe:visitType.content.title',
                          required: true,
                        },
                        presentation: {
                          type: 'area',
                          label: 'apostrophe:visitType.content.presentation',
                          min: 1,
                          max: 1,
                          options: {
                            widgets: {
                              '@apostrophecms/image': {},
                              '@apostrophecms/video': {},
                            },
                          },
                        },
                        urlPodcast: {
                          type: 'url',
                          label: 'apostrophe:visitType.content.urlPodcast',
                        },
                        content: {
                          type: 'area',
                          label: 'apostrophe:visitType.content.content',
                          required: true,
                          options: {
                            widgets: {
                              '@apostrophecms/rich-text': {},
                              '@apostrophecms/image': {},
                            },
                          },
                        },
                        interview: {
                          type: 'area',
                          label: 'apostrophe:visitType.content.interview',
                          min: 1,
                          options: {
                            widgets: {
                              '@apostrophecms/image': {},
                              '@apostrophecms/video': {},
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    group: {
      basics: {
        fields: ['image', 'track', 'steps'],
      },
    },
  },
}
