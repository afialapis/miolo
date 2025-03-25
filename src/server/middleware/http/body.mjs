import koa_body_parser from '@koa/bodyparser'
import koa_compress from 'koa-compress'
import {constants} from 'node:zlib'

const init_body_middleware = ( app ) => {
  // Compress
  
  app.use(koa_compress({
    filter: function (content_type) {
      return content_type=='application/json' || content_type=='text/html'
    },
    //threshold: 2048,
    gzip: {
      flush: constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: constants.Z_SYNC_FLUSH,
    },
    br: false // disable brotli

  }))

  app.use(koa_body_parser({
    formLimit: '100mb',
    jsonLimit: '100mb',
    bufferLimit: '100mb',
  }))

}

export { init_body_middleware }