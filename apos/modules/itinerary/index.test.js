const itinerary = require('./index')
const self = require('apostrophe')

describe('itinerary', () => {
  self.insert = jest.fn()
  self.newInstance = jest.fn()
  self.apos = {
    util: {
      log: jest.fn(),
      error: jest.fn(),
    },
    place: {
      find: jest.fn().mockImplementation(() => {
        return {
          project: jest.fn().mockImplementation(() => {
            return {
              toArray: jest.fn().mockImplementation(() => [
                {
                  title: 'Itinéraire événement',
                  itineraryType: 'event',
                  startDate: '2022-04-05',
                  price: 10,
                  duration: '02:00',
                  mileage: 2,
                },
              ]),
            }
          }),
        }
      }),
    },
  }

  test('fixtures are run', async () => {
    const runFixtures = itinerary.handlers(self)['@apostrophecms/db:fixtures']
    await runFixtures.itineraryFixtures({})
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.apos.place.find).toHaveBeenCalled()
    expect(self.insert).toHaveBeenCalled()

    self.apos.place = {
      find: jest.fn().mockImplementation(() => {
        return {
          project: jest.fn().mockImplementation(() => {
            return {
              toArray: jest.fn().mockImplementation(() => []),
            }
          }),
        }
      }),
    }
    await runFixtures.itineraryFixtures({})
    expect(self.apos.util.error).toHaveBeenCalled()
  })
})
