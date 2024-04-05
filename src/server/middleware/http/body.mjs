import koa_body_parser from 'koa-better-body'
//import koa_body_parser from 'koa-bodyparser'
import koa_convert from 'koa-convert'
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

  // body parser - koa-better-body

  // koa-better-body needs some customization in order to 
  //   work for koa-passport
  // By default it save POST params in request.fields. But koa-passport
  //   expects that values in request.body.
  // We will copy request.fields and request.files in request.body.
  //   1.- It could be done through this option parameters;
  //       https://github.com/rkusa/koa-passport/issues/33#issuecomment-122611613
  //       https://github.com/tunnckoCore/opensource/tree/master/%40packages/koa-better-body#options
  //       {fields: 'body', files: 'body',}
  //       But this will cause errors on other parts (for example, init_router())
  //   2.- but still need to know how dangerous it is to touch request.body (as by default, 
  //       koa-better-body is saving some async function in request.body)
  //  We patch the .body on the `request` middleware

  app.use(koa_convert(koa_body_parser({
    formLimit: '100mb',
    jsonLimit: '100mb',
    bufferLimit: '100mb',
  })))

  

  // body parser - koa-bodyparser
  //app.use(koa_body_parser())
}

export { init_body_middleware }