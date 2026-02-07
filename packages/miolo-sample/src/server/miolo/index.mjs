import http from './http.mjs'
import credentials from './auth.mjs'
import db from './db.mjs'
import routes from './routes/index.mjs'
import cache from './cache.mjs'
import init_cron from './cron/index.mjs'
import {loader} from './ssr/loader.mjs'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'



export default () => {
  return {
    name: 'miolo-sample',
    http,
    auth: {credentials},
    db,
    routes,
    cache,
    build: {
      ssr: {loader}, 
    },
    cron: init_cron()
  }
}
