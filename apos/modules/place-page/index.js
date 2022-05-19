module.exports = {
  extend: '@apostrophecms/piece-page-type',
  methods(self) {
    return {
      async visitPage(req) {
        const piece = await self.apos.place
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
