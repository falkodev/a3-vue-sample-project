const domain = require('./index')
const self = require('apostrophe')

describe('domain', () => {
  const doc = {
    title: 'Domaine Test',
    address: '12 avenue Charles de Gaulle, 34001 Montpellier',
    longitude: 3.543093,
    latitude: 43.652038,
    slug: 'domain-test',
    type: 'domain',
    fixtures: true,
  }

  asyncFs = {
    unlink: jest.fn(),
    readdir: jest.fn(),
    readFile: jest.fn(),
    writeFile: jest.fn(),
  }

  fs = {
    createWriteStream: jest.fn(),
  }

  self.find = () => {
    return {
      toArray: jest.fn().mockImplementation(() => []),
    }
  }
  self.insert = jest.fn()
  self.newInstance = jest.fn()
  self.localize = jest.fn()
  self.publish = jest.fn()

  self.methods = {
    getDomains: jest.fn(),
    createDomainsFromData: jest.fn(),
  }
  self.apos = {
    i18n: {
      locales: {
        fr: {
          label: 'Français',
          prefix: '/fr',
        },
        en: {
          label: 'English',
          prefix: '/en',
        },
      },
    },
    util: {
      log: jest.fn(),
      error: jest.fn(),
      slugify: jest.fn().mockImplementationOnce(() => 'wine-store'),
    },
    task: {
      getReq: jest.fn(),
    },
    modules: {
      domain: {
        insert: jest.fn().mockImplementation(() => ({
          title: 'Les Caves Gourmandes',
          address: "10 All. de l'Esplanade, Gignac",
          longitude: 3.5527339,
          latitude: 43.6527002,
          slug: 'les-caves-gourmandes6',
          visibility: 'public',
          archived: false,
          type: 'domain',
          aposDocId: 'cl1f0wdz60004nup5n1qc6sc4',
          _id: 'cl1f0wdz60004nup5n1qc6sc4',
          metaType: 'doc',
          image: null,
        })),
        find: self.find,
        newInstance: jest.fn(),
        localize: jest.fn(),
        publish: jest.fn(),
      },
    },
    http: {
      get: jest.fn().mockImplementation(() => {
        return {
          results: [
            {
              name: 'Domaine Test',
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
    migration: {
      add: jest.fn(),
    },
    place: {
      fetchPlaces: jest.fn(),
    },
  }

  const beforeSave = domain.handlers(self).beforeSave
  const methods = domain.methods(self)

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

  test('getDomains', async () => {
    await methods.getDomains({ force: false })
    expect(self.apos.util.log).toHaveBeenCalled()

    const nodeAppInstance = process.env.NODE_APP_INSTANCE

    process.env.NODE_APP_INSTANCE = ''
    await methods.getDomains({ force: false })
    expect(self.apos.util.error).toHaveBeenCalled()

    process.env.NODE_APP_INSTANCE = nodeAppInstance
    await methods.getDomains({ force: true })
    expect(self.apos.place.fetchPlaces).toHaveBeenCalled()
  })
})
