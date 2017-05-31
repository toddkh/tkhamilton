import Logger from 'structure-logger'

module.exports = function loggerMiddleware(req, res, next) {
  const requestId = req.headers['x-request-id']

  req.logger = new Logger({
    applicationName: 'www.tkhamilton.com',
    namespace: 'default',
    requestId: requestId
  })

  req.logger.info(`${req.method} ${req.originalUrl}`)

  /*
  TODO:
  This needs to be updated as the logger instance is now defined per request

  We use a child here to both segregate logs by namespace and to also help with the fact that the request id
  will not be guaranteed to be correct on logs from this module
  */
  require('replicate-paradigm-api/lib/utilities').handleError.logger = req.logger.child('replicate-paradigm-api')

  next()
}
