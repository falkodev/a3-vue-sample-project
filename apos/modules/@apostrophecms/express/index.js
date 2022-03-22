const expressOasGenerator = require('express-oas-generator')

module.exports = {
  options: {
    port: 8080,
    session: {
      secret: 'kjdhfzjkh654d6s5f4gs654gfs54',
    },
  },
  handlers(self) {
    return {
      'apostrophe:ready': {
        async apiDocClose() {
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
