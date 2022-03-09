const expressOasGenerator = require('express-oas-generator')

module.exports = {
  options: {
    port: 8080,
    session: {
      // If this still says `undefined`, set a real secret!
      secret: 'kjdhfzjkh654d6s5f4gs654gfs54',
    },
  },
  handlers(self, options) {
    return {
      'apostrophe:ready': {
        async apiDocClose() {
          // self.apos.util.log('ready')
          expressOasGenerator.handleRequests()
        },
      },
      'apostrophe:modulesRegistered': {
        async apiDocStart() {
          expressOasGenerator.handleResponses(self.apos.app, {})
        },
      },
    }
  },
}
