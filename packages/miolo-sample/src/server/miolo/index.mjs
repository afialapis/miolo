import http from './http.mjs'
import local from './auth/local.mjs'
import google from './auth/google.mjs'
import db from './db.mjs'
import routes from './routes/index.mjs'
import cache from './cache.mjs'
import init_cron from './cron/index.mjs'
import {loader} from './ssr/loader.mjs'

export default () => {
  return {
    name: 'miolo-sample',
    http,
    auth: {
      //local,
      google
    },
    db,
    routes,
    cache,
    build: {
      ssr: {loader}, 
    },
    cron: init_cron()
  }
}
