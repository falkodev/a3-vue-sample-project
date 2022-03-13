module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'apostrophe:content',
  },
  fields: {
    add: {
      duration: {
        type: 'integer',
        required: true,
      },
      video: {
        type: 'oembed',
        help: 'URL Vimeo',
      },
      podcast: {
        type: 'string',
        help: 'URL podcast',
      },
      bulletPoints: {
        type: 'array',
        titleField: 'city',
        fields: {
          add: {
            description: {
              type: 'string',
            },
            icon: {
              type: 'area',
              options: {
                max: 1,
                widgets: {
                  '@apostrophecms/image': {},
                },
              },
            },
          },
        },
      },
      text: {
        type: 'area',
        options: {
          widgets: {
            '@apostrophecms/image': {},
            '@apostrophecms/rich-text': {
              toolbar: ['bold', 'italic'],
            },
            '@apostrophecms/video': {},
            '@apostrophecms/html': {},
          },
        },
      },
      thumbnail: {
        type: 'area',
        options: {
          max: 1,
          widgets: {
            '@apostrophecms/image': {},
          },
        },
      },
    },
    group: {
      basics: {
        fields: [
          'title',
          'duration',
          'video',
          'podcast',
          'bulletPoints',
          'text',
          'thumbnail',
        ],
      },
    },
  },
}
