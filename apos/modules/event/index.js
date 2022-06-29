const moment = require('moment')

module.exports = {
  extend: '@apostrophecms/piece-type',

  options: {
    alias: 'event',
    label: 'apostrophe:event.label',
    pluralLabel: 'apostrophe:event.pluralLabel',
    localized: true,
  },

  fields: {
    add: {
      eventType: {
        type: 'select',
        label: 'apostrophe:event.type',
        choices: [
          {
            label: 'apostrophe:event.tasting',
            value: 'tasting',
          },
          {
            label: 'apostrophe:event.oenologicalWorkshop',
            value: 'oenologicalWorkshop',
          },
          {
            label: 'apostrophe:event.winemakerMeal',
            value: 'winemakerMeal',
          },
          {
            label: 'apostrophe:event.winemakerEvening',
            value: 'winemakerEvening',
          },
          {
            label: 'apostrophe:event.visit',
            value: 'visit',
          },
        ],
        required: true,
      },

      description: {
        label: 'apostrophe:event.description',
        type: 'area',
        options: {
          'collapse-rich-text': {},
          max: 1,
        },
      },

      image: {
        type: 'attachment',
        label: 'apostrophe:event.image',
        fileGroup: 'images',
      },

      address: {
        type: 'area',
        label: 'apostrophe:addressSimple',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {},
          },
          max: 1,
        },
      },

      postalCode: {
        type: 'integer',
        label: 'apostrophe:postalCode',
      },

      city: {
        type: 'string',
        label: 'apostrophe:city',
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

      spokenLanguages: {
        type: 'checkboxes',
        label: 'apostrophe:spokenLanguages',
        choices: [
          {
            label: 'apostrophe:language.french',
            value: 'french',
          },
          {
            label: 'apostrophe:language.english',
            value: 'english',
          },
          {
            label: 'apostrophe:language.deutch',
            value: 'deutch',
          },
          {
            label: 'apostrophe:language.italian',
            value: 'italian',
          },
          {
            label: 'apostrophe:language.spanish',
            value: 'spanish',
          },
          {
            label: 'apostrophe:language.portuguese',
            value: 'portuguese',
          },
          {
            label: 'apostrophe:language.dutch',
            value: 'dutch',
          },
          {
            label: 'apostrophe:language.chinese',
            value: 'chinese',
          },
          {
            label: 'apostrophe:language.japanese',
            value: 'japanese',
          },
          {
            label: 'apostrophe:language.swedish',
            value: 'swedish',
          },
          {
            label: 'apostrophe:language.finnish',
            value: 'finnish',
          },
          {
            label: 'apostrophe:language.flemish',
            value: 'flemish',
          },
          {
            label: 'apostrophe:language.russian',
            value: 'russian',
          },
          {
            label: 'apostrophe:language.greek',
            value: 'greek',
          },
          {
            label: 'apostrophe:language.polish',
            value: 'polish',
          },
          {
            label: 'apostrophe:language.danish',
            value: 'danish',
          },
        ],
      },

      isPrivateVisit: {
        type: 'boolean',
        label: 'apostrophe:event.isPrivateVisit',
        help: 'apostrophe:event.isPrivateMessage',
      },

      exactNumberOfPeople: {
        label: 'apostrophe:event.exactNumberOfPeople',
        type: 'integer',
        min: 1,
        if: {
          isPrivateVisit: true,
        },
      },

      numberMinOfPeople: {
        label: 'apostrophe:event.numberMinOfPeople',
        type: 'integer',
        min: 1,
        if: {
          isPrivateVisit: false,
        },
      },

      numberMaxOfPeople: {
        label: 'apostrophe:event.numberMaxOfPeople',
        type: 'integer',
        min: 1,
        if: {
          isPrivateVisit: false,
        },
      },

      payingEvent: {
        label: 'apostrophe:event.payingEvent',
        type: 'boolean',
      },

      visitPrice: {
        label: 'apostrophe:visitPriceSimple',
        type: 'integer',
        if: {
          payingEvent: true,
        },
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

      isCasualVisit: {
        label: 'apostrophe:event.isCasualVisit',
        type: 'boolean',
        help: 'apostrophe:event.isCasualVisitMessage',
      },

      ifEventRepeat: {
        label: 'apostrophe:event.eventRepeat',
        type: 'radio',
        choices: [
          {
            label: 'apostrophe:event.week',
            value: 'week',
          },
          {
            label: 'apostrophe:event.month',
            value: 'month',
          },
          {
            label: 'apostrophe:event.year',
            value: 'year',
          },
        ],
        if: {
          isCasualVisit: true,
        },
      },

      weekRepeat: {
        label: 'apostrophe:event.weekRepeat',
        type: 'integer',
        min: 1,
        if: {
          ifEventRepeat: 'week',
        },
      },

      weekDayRepeat: {
        label: 'apostrophe:event.weekDayRepeat',
        type: 'checkboxes',
        choices: [
          {
            label: 'apostrophe:event.m',
            value: 'M',
          },
          {
            label: 'apostrophe:event.t',
            value: 'T',
          },
          {
            label: 'apostrophe:event.w',
            value: 'W',
          },
          {
            label: 'apostrophe:event.th',
            value: 'TH',
          },
          {
            label: 'apostrophe:event.f',
            value: 'F',
          },
          {
            label: 'apostrophe:event.s',
            value: 'S',
          },
          {
            label: 'apostrophe:event.su',
            value: 'SU',
          },
        ],
        if: {
          ifEventRepeat: 'week',
        },
      },
    },

    group: {
      basics: {
        label: 'apostrophe:event.eventDescription',
        fields: [
          'placeType',
          'eventType',
          'description',
          'image',
          'address',
          'postalCode',
          'city',
          'conveniences',
          'spokenLanguages',
        ],
      },

      bookingConditions: {
        label: 'apostrophe:event.bookingConditions',
        fields: [
          'isPrivateVisit',
          'exactNumberOfPeople',
          'numberMinOfPeople',
          'numberMaxOfPeople',
          'payingEvent',
          'visitPrice',
          'duration',
          'startDate',
          'endDate',
          'startTime',
          'endTime',
          'isCasualVisit',
          'ifEventRepeat',
          'weekRepeat',
          'weekDayRepeat',
        ],
      },
    },
  },

  columns: {
    add: {
      eventType: {
        label: 'apostrophe:event.type',
      },
    },
  },

  filters: {
    add: {
      eventType: {
        label: 'apostrophe:event.type',
      },
    },
  },

  components(self) {
    /* istanbul ignore next */
    return {
      async list(req) {
        const criteria = {
          itineraryType: 'event',
        }
        const array = await Promise.all([
          self.find(req).toArray(),
          self.apos.itinerary.find(req, criteria).toArray(),
        ])
        let result = array[0].concat(array[1])
        result = result.sort(
          (a, b) =>
            moment(a.startDate).valueOf() - moment(b.startDate).valueOf(),
        )
        let firstEvent = result.find((event) => event.itineraryType === 'event')
        const indexOfFirstEvent = result.indexOf(firstEvent)
        if (indexOfFirstEvent !== -1) {
          result.splice(indexOfFirstEvent, 1)
          result.unshift(firstEvent)
        }
        return { result }
      },
    }
  },
}
