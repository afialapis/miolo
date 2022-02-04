/**
 * Middleware for catching errors thrown in routes
 * @param ctx
 */

function init_catcher_middleware(app, logger) {
  
  async function catcher_middleware(err) {

    if (!err) return

    logger.error(err)

    let status = err.status || 400

    const type = this.accepts(['text', 'json', 'html'])
    if (!type) {
      status = 406;
      err.message = 'Unsupported type'
    }

    if (typeof status != 'number') {
      status = 500
    }

    // Nothing we can do here other than delegate to the app-level handler and log.
    if (this.headerSent || !this.writable) {
      logger.debug('headers were already sent, returning early')
      err.headerSent = true
      return
    }

    this.type = 'json'
    this.status = status

    this.body = JSON.stringify(this.body || '', null, 2)
    this.length = Buffer.byteLength(this.body)
    this.res.end(this.body)
  }

  app.context.onerror = catcher_middleware
}

export {init_catcher_middleware}
