// import path from 'path'
// import { fileURLToPath } from 'url'
// const __my_filename = fileURLToPath(import.meta.url)
// const __my_dirname = path.dirname(__my_filename)

import def_routes from './routes/index.mjs'
import local from './auth/local.mjs'
import google from './auth/google.mjs'
import basic_auth from './auth/basic.mjs'

import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

export const makeConfig = (authMode, logLevel= 'error') => {
  const auth = 
      authMode=='guest' ? {guest: {}}
    : authMode=='basic' ? {basic: basic_auth}
    : {local, google}
  
  return () => {
    return {
      http: {
        port: 8001,
        hostname: 'localhost',
        
        catcher_url: undefined, //'/sys/jserror',
        
        //
        // Folders to be mounted by koa for static content
        //
        static: {
          favicon: path.resolve(__my_dirname, '../../../../miolo-demo/server/static/img/favicon.ico'),
          //folders: {
          //  '/static': path.resolve(__my_dirname, 'static')
          //}        
        },

        cors: false,
        proxy: false
      },    
      session: {
        options: {
          secure: false
        }
      },
      db: {
        config: {
          dialect:  'postgres',
          host:     'localhost',
          port:     5432,
          database: 'miolo',
          user:     'postgres',
          password: 'postgres'
        },
        options: {
          tables: [{
            name: 'todos',
            options: {
              useDateFields: false,
              //checkBeforeDelete: ["edition.agent_id"],
              //customHooks: {
              //  beforeInsert: beforeInsertTest,
              //  beforeUpdate: beforeUpdateTest
              //}
            } 
          }],
        // log: logLevel
        }
      },
      log: {
        level: logLevel,
        console: { enabled: true, level: logLevel },
      },
      routes: def_routes,
      auth
    }
  }
}
