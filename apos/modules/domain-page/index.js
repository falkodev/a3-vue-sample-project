/* istanbul ignore next */
module.exports = {
  extend: '@apostrophecms/piece-page-type',
  options: {
    label: 'apostrophe:domain',
  },
  methods(self) {
    return {
      beforeIndex(req) {
        req.notFound = true
      },
      async visitPage(req) {
        const piece = await self.apos.domain
          .find(req, { slug: req.params.slug })
          .toObject()
        self.setTemplate(req, 'visit')
        req.data.piece = piece
      },
    }
  },
  extendMethods(self) {
    return {
      dispatchAll(_super) {
        _super()
        self.dispatch('/:slug/visit', self.visitPage)
      },
    }
  },
}
