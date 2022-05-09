module.exports = {
  extend: '@apostrophecms/piece-page-type',
  methods(self) {
    return {
      async visitPage(req) {
        // console.log('req params slug', req.params.slug, 'req', req)
        const piece = await self.apos.place
          .find(req, { slug: req.params.slug })
          .toObject()
        // console.log('piece: ', piece)
        self.setTemplate(req, 'visit')
        req.data.piece = piece
      },
    }
  },
  extendMethods(self) {
    return {
      dispatchAll(_super) {
        // console.log('Passing through dispatchAll')
        _super()
        self.dispatch('/:slug/visit', self.visitPage)
      },
    }
  },
}
