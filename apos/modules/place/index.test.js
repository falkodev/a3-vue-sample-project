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
              vicinity: '12 avenue Charles de Gaulle, 34001 Montpellier',
              geometry: {
                location: {
                  lgn: 3.543093,
                  lat: 43.652038,
                },
              },
              photos: [
                {
                  photo_reference:
                    'Aap_uED7w4Zs0q4lAy3YPJ__J4FE1-Ov5rNOP8A3bdGa9p_yKXCYuFcJDYddEbC4Sj6nd_P1dlSzSOWcJ7pKe6Z8s53FmAv5CG-l5scTUJyZR6BpvRBbsNZlbc5IGx5jKbR18VN7DHxeAp34FEruTOJu3v9ZMtW55NLqI7ngxmbAviNnGwev',
                },
              ],
            },
          ],
        }
      }),
    },
    attachment: {
      insert: jest.fn(),
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
    const { url } = config.get('placesAPI')
    const searchUrlQuery = qs.stringify(url.search.querystring)
    const searchUrl = `${url.prefix}/${url.search.url}?${searchUrlQuery}`
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.apos.http.get).toHaveBeenCalledWith(searchUrl)
    expect(self.apos.attachment.insert).toHaveBeenCalled()
    expect(self.insert).toHaveBeenCalled()

    self.apos.attachment = {}
    await runFixtures.placeFixtures({})

    self.apos.http = {}
    await runFixtures.placeFixtures({})
    expect(self.apos.util.error).toHaveBeenCalled()
  })
})
