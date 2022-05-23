module.exports = {
  handlers() {
    return {
      '@apostrophecms/page:beforeSend': {
        webpack(req) {
          req.data.isDev = process.env.NODE_ENV !== 'production'
        },
      },
    }
  },
}
