const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      levelFirst: true,
      colorize: true,
      translateTime: 'HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
})

module.exports = {
  methods() {
    return {
      log(msg) {
        logger.info(msg)
      },
      info(msg) {
        logger.info(msg)
      },
      debug(msg) {
        logger.debug(msg)
      },
      warn(msg) {
        logger.warn(msg)
      },
      error(msg) {
        logger.error(msg)
      },
    }
  },
}
