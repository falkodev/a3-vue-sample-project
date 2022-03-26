const place = require('./index')

const qs = require('qs')
const config = require('config')
const self = require('apostrophe')
describe('place', () => {
  self.insert = jest.fn()
  self.newInstance = jest.fn()
  self.apos = {
    util: {
      log: jest.fn(),
      error: jest.fn(),
    },
    http: {
      get: jest.fn().mockImplementation(() => {
        return {
          results: [
            {
              name: 'Wine store',
              location: {
                formatted_address:
                  '12 avenue Charles de Gaulle, 34001 Montpellier',
              },
              geocodes: {
                main: {
                  longitude: 3.543093,
                  latitude: 43.652038,
                },
              },
            },
          ],
        }
      }),
    },
  }

  const doc = {
    title: 'Wine store',
    placeType: 'wineStore',
    address: '12 avenue Charles de Gaulle, 34001 Montpellier',
    longitude: 3.543093,
    latitude: 43.652038,
    slug: 'wine-store',
    type: 'place',
    fixtures: true,
  }

  const beforeSave = place.handlers(self).beforeSave

  test('should have coordinates and convert them to GeoJSON point', () => {
    const newDoc = beforeSave.convertCoordinatesToGeoJSONPoint({}, doc)
    expect(newDoc).toHaveProperty('longitude')
    expect(newDoc).toHaveProperty('latitude')
    expect.objectContaining({
      geoLocation: {
        type: 'Point',
        coordinates: [newDoc.longitude, newDoc.latitude],
      },
    })
  })

  test('fixtures are run', async () => {
    const runFixtures = place.handlers(self)['@apostrophecms/db:fixtures']
    await runFixtures.placeFixtures({})
    const { url, querystring, headers } = config.get('placesAPI')
    const urlQuery = qs.stringify(querystring)
    const finalUrl = `${url}?${urlQuery}`
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.apos.http.get).toHaveBeenCalledWith(finalUrl, { headers })
    expect(self.insert).toHaveBeenCalled()

    self.apos.http = {}
    await runFixtures.placeFixtures({})
    expect(self.apos.util.error).toHaveBeenCalled()
  })
})
