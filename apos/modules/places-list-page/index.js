const config = require('config')

module.exports = {
  extend: '@apostrophecms/page-type',
  options: {
    label: 'apostrophe:places-list',
  },

  components(self) {
    return {

      async placesCategories(req) {
        const categories = config.get('categories')
        const criteria = {
          reception: true,
        }
        const result = await Promise.all([
          self.apos.domain.find(req, criteria).limit(8).toArray(),
          ...categories.map((category) =>
            self.apos.place.find(req, { placeType: category.value }).limit(8).toArray(),
          ),
        ])
        return { result }
      },

      async category(req) {
        let parametersPlaces = req.absoluteUrl;
        let result;

        if (parametersPlaces == "/places-list?place=domain" ) {
          result = await Promise.all([
            self.apos.domain.find(req).toArray(),'domain',
          ])
          return { result }
        } else {
          if (parametersPlaces == "/places-list?place=wineStore" ) {
            var placeUrl = "wineStore";
          }
          else if (parametersPlaces == "/places-list?place=wineBar" ) {
            var placeUrl = "wineBar";
          }
          else if (parametersPlaces == "/places-list?place=poi" ) {
            var placeUrl = "poi";
          }
          result = await Promise.all([
            self.apos.place.find(req, { placeType: placeUrl }).toArray(),
            placeUrl,
          ])
        }
        return { result }
      },
    }
  }
}