const path = require('path')
const moment = require('moment')
const asyncFs = require('fs/promises')

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
    },
  },
  extendMethods() {
    return {
      getBrowserData(_super, req) {
        const data = _super(req)
        data.labels = {
          see: req.t('apostrophe:theme.see'),
          more: req.t('apostrophe:theme.more'),
          less: req.t('apostrophe:theme.less'),
          globalInfos: req.t('apostrophe:theme.globalInfos'),
          visitList: req.t('apostrophe:theme.visitList'),
          add: req.t('apostrophe:theme.add'),
          takeAppointment: req.t('apostrophe:theme.takeAppointment'),
          favorite: req.t('apostrophe:theme.favorite'),
          SelfGuidedTour: req.t('apostrophe:theme.SelfGuidedTour'),
        }

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
                'No places defined. Please, run the task to fetch places through the defined API, most likey "npm run task --prefix apos -- place:fetch"',
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
