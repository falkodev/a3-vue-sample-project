const path = require('path')
const moment = require('moment')
const asyncFs = require('fs/promises')

module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    alias: 'itinerary',
    label: 'apostrophe:itinerary.label',
    pluralLabel: 'apostrophe:itinerary.pluralLabel',
    localized: true,
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
        min: 0,
      },
      image: {
        type: 'attachment',
        label: 'apostrophe:image',
        fileGroup: 'images',
      },
      steps: {
        type: 'array',
        label: 'apostrophe:steps',
        fields: {
          add: {
            stepType: {
              type: 'select',
              label: 'apostrophe:stepType',
              choices: [
                {
                  label: 'apostrophe:place.label',
                  value: 'place',
                },
                {
                  label: 'apostrophe:domain',
                  value: 'domain',
                },
              ],
            },
            _place: {
              type: 'relationship',
              label: 'apostrophe:place.label',
              if: { stepType: 'place' },
            },
            _domain: {
              //TODO: when an order is created, check its matching itinerary, get steps with "domain" place and add them to the order
              type: 'relationship',
              label: 'apostrophe:domain',
              if: { stepType: 'domain' },
            },
            duration: {
              type: 'time',
              label: 'apostrophe:duration',
            },
            content: {
              type: 'array',
              label: 'apostrophe:visitType.content.content',
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
                    label: 'apostrophe:visitType.content.singleContent',
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
        if: {
          $or: [{ itineraryType: 'theme' }, { itineraryType: 'syndicate' }],
        },
      },
      _visits: {
        type: 'relationship',
        withType: 'visit',
        max: 1,
        if: {
          itineraryType: 'event',
        },
      },
    },
    group: {
      basics: {
        fields: ['itineraryType', 'description', 'price', 'image'],
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
      visit: {
        label: 'apostrophe:visitType.pluralLabel',
        fields: ['_visits'],
        if: {
          itineraryType: 'event',
        },
      },
    },
  },

  extendMethods(self) {
    /* istanbul ignore next */
    return {
      getBrowserData(_super, req) {
        const data = _super(req)
        data.labels = {
          add: req.t('apostrophe:add'),
          see: req.t('apostrophe:see'),
          more: req.t('apostrophe:more'),
          less: req.t('apostrophe:less'),
          free: req.t('apostrophe:free'),
          domain: req.t('apostrophe:domain'),
          wineBar: req.t('apostrophe:wineBar'),
          favorites: req.t('apostrophe:favorites'),
          wineStore: req.t('apostrophe:wineStore'),
          visitList: req.t('apostrophe:itinerary.visitList'),
          autoGuidedVisit: req.t('apostrophe:autoGuidedVisit'),
          globalInfos: req.t('apostrophe:itinerary.globalInfos'),
          takeAppointment: req.t('apostrophe:itinerary.takeAppointment'),
          validateItinerary: req.t('apostrophe:itinerary.validate'),
        }

        data.assetBaseUrl = self.apos.asset.getAssetBaseUrl()

        return data
      },
    }
  },

  handlers(self) {
    return {
      '@apostrophecms/db:fixtures': {
        async itineraryFixtures(req) {
          try {
            self.apos.util.log('Starting itinerary fixtures')

            const placesIds = await self.apos.place
              .find(req, {})
              .project({ _id: 1 })
              .toArray()

            if (!placesIds.length) {
              throw new Error(
                'No places defined. Please, run the task to fetch places through the defined API, most likely "npm run task -- place:fetch"',
              )
            }

            const setSteps = (number) => {
              const steps = []
              for (let i = 0; i < number; i++) {
                const place =
                  placesIds[Math.floor(Math.random() * placesIds.length)]
                steps.push({
                  placeIds: [place._id],
                })
              }
              return steps
            }

            const imagesFolder = path.resolve(__dirname, './images/')
            const imagesNames = await asyncFs.readdir(imagesFolder)
            const uploadedImages = await Promise.all(
              imagesNames.map((imageName) => {
                const imagePath = `${imagesFolder}/${imageName}`
                return self.apos.attachment.insert(req, {
                  name: imageName,
                  path: imagePath,
                  fixtures: true,
                })
              }),
            )

            const defaultItinerary = {
              startTime: '09:00',
              endTime: '17:00',
              duration: '02:00',
              mileage: 2.5,
              description:
                'Lorem ipsum dolor sit amet. Vel placeat sint et fugiat ducimus aut eveniet nesciunt ex assumenda neque ea voluptatem asperiores eum voluptas beatae est perferendis cumque?' +
                'Quo commodi nisi ut dolorem ipsa ut quis molestiae qui recusandae voluptas. Et quae doloremque id iste voluptatem aut voluptate tempore cum reiciendis delectus.' +
                'Qui consectetur velit non sapiente voluptas eum eligendi fugiat ad aperiam nisi.' +
                '\n\nQui voluptas praesentium ut laudantium cupiditate aut nesciunt laudantium sit praesentium esse. Sed provident saepe ea enim repellat aut nobis fuga eos amet quam.' +
                'Et quas unde rem cumque soluta et doloribus earum ut totam magni.' +
                'Et distinctio nisi eos sunt delectus hic recusandae delectus ex expedita dicta.' +
                '\n\nEx dolor omnis aut consequatur obcaecati est labore illum ex enim consectetur a quasi atque.' +
                'Qui architecto ipsam aut facilis saepe et ducimus consequuntur quo consequuntur ipsum.',
            }

            const itineraries = [
              {
                title: 'Itinéraire événement',
                itineraryType: 'event',
                startDate: moment().add(1, 'months').format('YYYY-MM-DD'),
                endDate: moment().add(1, 'months').format('YYYY-MM-DD'),
                price: 19.9,
                steps: setSteps(3),
                image: uploadedImages[0],
                ...defaultItinerary,
              },
              {
                title: 'Itinéraire thématique',
                itineraryType: 'theme',
                startDate: moment().add(2, 'months').format('YYYY-MM-DD'),
                endDate: moment().add(2, 'months').format('YYYY-MM-DD'),
                price: 25,
                steps: setSteps(5),
                image: uploadedImages[1],
                ...defaultItinerary,
              },
              {
                title: 'Itinéraire syndical',
                itineraryType: 'syndicate',
                startDate: moment().add(3, 'months').format('YYYY-MM-DD'),
                endDate: moment().add(3, 'months').format('YYYY-MM-DD'),
                price: 50,
                steps: setSteps(7),
                image: uploadedImages[2],
                ...defaultItinerary,
              },
              {
                title: 'Itinéraire événement 2',
                itineraryType: 'event',
                startDate: moment().add(2, 'months').format('YYYY-MM-DD'),
                endDate: moment().add(2, 'months').format('YYYY-MM-DD'),
                price: 22,
                steps: setSteps(4),
                image: uploadedImages[3],
                ...defaultItinerary,
              },
            ]

            await Promise.all(
              itineraries.map((itinerary) =>
                self.insert(req, {
                  ...self.newInstance(),
                  ...itinerary,
                  fixtures: true,
                }),
              ),
            )

            self.apos.util.log('Itinerary fixtures done')
          } catch (error) {
            self.apos.util.error(`Itinerary fixtures error: ${error}`)
          }
        },
      },
    }
  },
}
