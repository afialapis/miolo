/**
 * Middleware for catching errors thrown in routes
 * @param ctx
 */

import http from 'http'
const _ONLY_WARN= [401, 403]

function init_catcher_middleware(app) {
  const logger= app.context.miolo.logger
  
  async function catcher_middleware(err) {
    if (!err) return

    // wrap non-error object
    if (!(err instanceof Error)) {
      let errMsg = err;
      if (typeof err === 'object') {
        try {
          errMsg = JSON.stringify(err);
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
      const newError = new Error('non-error thrown: ' + errMsg);
      // err maybe an object, try to copy the name, message and stack to the new error instance
      if (err) {
        if (err.name) newError.name = err.name;
        if (err.message) newError.message = err.message;
        if (err.stack) newError.stack = err.stack;
        if (err.status) newError.status = err.status;
        if (err.headers) newError.headers = err.headers;
      }
      err = newError;
    }
    
    const headerSent = this.headerSent || !this.writable;
    if (headerSent) err.headerSent = true;
    
    // delegate
    this.app.emit('error', err, this);    

    // ENOENT support
    if (err.code === 'ENOENT') err.status = 404;

    // Get HTML status code
    let status = err.status || 400
    const type = this.accepts(['text', 'json', 'html'])
    if (!type) {
      status = 406
      err.message = 'Unsupported type'
    } else if (typeof err.status !== 'number' || !http.STATUS_CODES[err.status]) {
      err.status = 500
    }
    this.status = status
  

    // Log the error depending on the status
    const ip = this.headers["x-real-ip"] || this.headers["x-orig-ip"] || this.ip || '127.0.0.1'
    if (_ONLY_WARN.indexOf(status)>=0) {
      logger.warn(`[${ip}] ${this.method} ${this.url} - ${status}: ${err.message}`)
    } else {
      logger.error(err)
    }

    // Nothing we can do here other than delegate to the app-level handler and log.
    if (err.headerSent ) {
      logger.warn('headers were already sent, returning early')
      return
    }

    // Prepare response a bit
    this.type = 'json'
    this.body = JSON.stringify(this.body || '', null, 2)
    this.length = Buffer.byteLength(this.body)
    this.res.end(this.body)
  }

  app.context.onerror = catcher_middleware
}

export {init_catcher_middleware}
