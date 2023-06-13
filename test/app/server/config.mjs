// import path from 'path'
// import { fileURLToPath } from 'url'
// const __my_filename = fileURLToPath(import.meta.url)
// const __my_dirname = path.dirname(__my_filename)

import def_routes from './routes/index.mjs'
import passport from './auth/passport.mjs'
import basic_auth from './auth/basic.mjs'

export const makeConfig = (authType, logLevel= 'error') => {
  const auth = 
      authType=='guest' ? {guest: {}}
    : authType=='basic' ? {basic: basic_auth}
    : {passport}


  return {
    http: {
      port: 8001,
      hostname: 'localhost',
      
      catcher_url: undefined, //'/sys/jserror',
      
      //
      // Folders to be mounted by koa for static content
      //
      // static: {
      //   favicon: path.resolve(__my_dirname, 'static/img/favicon.ico'),
      //   folders: {
      //     '/static': path.resolve(__my_dirname, 'static')
      //   }        
      // },

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
      log: logLevel,
    },
    log: {
      level: logLevel,
      console: { enabled: true, level: logLevel },
    },
    routes: def_routes,
    auth
  }
}
