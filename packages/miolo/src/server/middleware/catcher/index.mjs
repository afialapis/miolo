/**
 * Middleware for catching errors thrown in routes
 * @param ctx
 */

const _ONLY_WARN= [401]

function init_catcher_middleware(app, logger) {
  
  async function catcher_middleware(err) {

    if (!err) return

    // Get HTML status code
    let status = err.status || 400
    const type = this.accepts(['text', 'json', 'html'])
    if (!type) {
      status = 406;
      err.message = 'Unsupported type'
    } else  if (typeof status != 'number') {
      status = 500
    }

    // Log the error depending on the status

    if (_ONLY_WARN.indexOf(status)>=0) {
      logger.warn(`${this.method} ${this.url} - ${status}: ${err.message}`)
    } else {
      logger.error(err)
    }

    // Nothing we can do here other than delegate to the app-level handler and log.
    if (this.headerSent || !this.writable) {
      logger.debug('headers were already sent, returning early')
      err.headerSent = true
      return
    }

    // Prepare response a bit
    this.type = 'json'
    this.status = status
    this.body = JSON.stringify(this.body || '', null, 2)
    this.length = Buffer.byteLength(this.body)
    this.res.end(this.body)
  }

  app.context.onerror = catcher_middleware
}

export {init_catcher_middleware}
