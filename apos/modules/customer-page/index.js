module.exports = {
  extend: '@apostrophecms/piece-page-type',

  methods() {
    return {
      beforeIndex(req) {
        req.notFound = true
      },

      beforeShow(req) {
        if (req.user?.role !== 'guest') {
          req.notFound = true
        } else {
          const currentUserSlug = req.user.slug.split('user-')[1]
          const currentCustomerUrl = decodeURI(req.url.split('/customer/')[1])

          if (currentUserSlug !== currentCustomerUrl) {
            req.notFound = true
          }
        }
      },
    }
  },
}
