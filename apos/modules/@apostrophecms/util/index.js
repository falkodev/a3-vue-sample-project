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
      log(msg, customMsg) {
        logger.info(`${msg} ${customMsg || ''}`)
      },
      info(msg, customMsg) {
        logger.info(`${msg} ${customMsg || ''}`)
      },
      debug(msg, customMsg) {
        logger.debug(`${msg} ${customMsg || ''}`)
      },
      warn(msg, customMsg) {
        logger.warn(`${msg} ${customMsg || ''}`)
      },
      error(msg, customMsg) {
        logger.error(`${msg} ${customMsg || ''}`)
      },
    }
  },
}
