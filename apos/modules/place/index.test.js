const place = require('./index')
const config = require('config')
const self = require('apostrophe')

describe('place', () => {
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
  self.methods = {
    getPlaces: jest.fn(),
    createPlacesFromData: jest.fn(),
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
      place: {
        insert: jest.fn(),
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
    migration: {
      add: jest.fn(),
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

  const methods = place.methods(self)
  test('setChoices', () => {
    expect(methods.setChoices()).toBeInstanceOf(Array)
  })

  test('getPlaces', async () => {
    await methods.getPlaces({ force: false })
    expect(self.apos.util.log).toHaveBeenCalled()

    const nodeAppInstance = process.env.NODE_APP_INSTANCE

    process.env.NODE_APP_INSTANCE = ''
    await methods.getPlaces({ force: false })
    expect(self.apos.util.error).toHaveBeenCalled()

    process.env.NODE_APP_INSTANCE = nodeAppInstance
    await methods.getPlaces({ force: true })
  })

  test('createPlacesFromData', async () => {
    const fakeJSON = JSON.stringify([
      {
        title: 'Les Caves Gourmandes',
        placeType: 'wineStore',
        address: "10 All. de l'Esplanade, Gignac",
        longitude: 3.5527339,
        latitude: 43.6527002,
        slug: 'les-caves-gourmandes6',
        visibility: 'public',
        archived: false,
        type: 'place',
        aposDocId: 'cl1f0wdz60004nup5n1qc6sc5',
        _id: 'cl1f0wdz60004nup5n1qc6sc5',
        metaType: 'doc',
        image: null,
      },
      {
        title: 'Grappe',
        placeType: 'wineStore',
        address: '125 Av. Pierre Mendès France, Gignac',
        longitude: 3.54351,
        latitude: 43.652149,
        slug: 'grappe2',
        visibility: 'public',
        archived: false,
        image: {
          _id: 'cl1f0wefk0005nup5js7893sk',
          group: 'images',
          createdAt: '2022-03-31T13:18:53.086Z',
          name: 'grappe',
          title: 'grappe',
          extension: 'jpg',
          type: 'attachment',
          docIds: [],
          archivedDocIds: [],
          length: 0,
          md5: '80bdfdafcd239483235d25e8bdf895f4',
          width: 800,
          height: 532,
          landscape: true,
        },
        type: 'place',
      },
    ])
    const assetsDir = 'domains/test'
    await methods.createPlacesFromData('place', assetsDir, fakeJSON)
    expect(self.apos.task.getReq).toHaveBeenCalled()
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.apos.modules.place.insert).toHaveBeenCalledTimes(2)
  })

  test('fetchPlaces', async () => {
    const assetsDir = require('path').resolve(__dirname, `./domains/test`)
    const categories = config.get('categories')
    await methods.fetchPlaces('place', categories, assetsDir)
    expect(self.apos.util.log).toHaveBeenCalled()
    expect(self.apos.http.get).toHaveBeenCalled()
    expect(self.apos.attachment.insert).toHaveBeenCalled()
    expect(self.apos.modules.place.insert).toHaveBeenCalled()
  })
})
