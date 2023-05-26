import path from 'path'
import merge from 'assign-deep'
import routes from './db/routes/index.mjs'
import passport from './auth/passport.mjs'
import basic_auth from './auth/basic.mjs'

const demo_server_make_config = (buildFolder, authType= 'guest', extraConfig= undefined) => {


  const auth = 
      authType=='guest' ? {guest: {}}
    : authType=='basic' ? {basic: basic_auth}
    : {passport}

  let config= {
    http: {
      port: 8001,
      hostname: 'localhost',
      
      //
      // Folders to be mounted by koa for static content
      //
      static: {
        favicon: path.resolve(__dirname, 'static/img/favicon.ico'),
        folders: {
          '/build': buildFolder,
          '/static': path.resolve(__dirname, 'static')
        }
      },

      cors: false,
      proxy: false
    },
    auth,
    session: {
      salt: 'SUPER_SALTY_YES?',
      secret: 'SUPER_SECRET_KEY_KERE',
      options: {
        maxAge: 86400000,
        /** (boolean) secure cookie*/
        secure: false, // true, 
        /** (string) session cookie sameSite options (default null, don't set it) */
        sameSite: 'strict',

      }
    },  
    db: {
      config: {
        dialect:  'postgres',
        host:     'localhost',
        port:     5432,
        database: 'miolo',
        user:     'postgres',
        password: 'postgres',
        max:      5,          // Maximum number of connection in pool
        min:      0,          // Minimum number of connection in pool
        idleTimeoutMillis: 10000,  // The maximum time, in milliseconds, that a connection can be idle before being released. Use with combination of evict for proper working, for more details read https://github.com/coopernurse/node-pool/issues/178#issuecomment-327110870,
      },
      options: {
        tables: [
          {
            name: 'todos',
            options: {
              useDates: false,
              //checkBeforeDelete: ["edition.agent_id"],
              //customHooks: {
              //  beforeInsert: beforeInsertTest,
              //  beforeUpdate: beforeUpdateTest
              //}
            } 
          } 
        ]
      }
    },
    routes: routes,
    catcher: undefined, //'/sys/jserror',
    redis: {
      host: '127.0.0.1',
      port: 6379
    },    
    log: {
      level: 'silly',
      format: {
        locale: 'es'
      },
      console: {
        enabled: true,
        level: 'silly',
      },
      file: {
        enabled: false,
        level: 'debug',
        filename: '/var/log/miolo.log'
      },
      mail: {
        enabled: false,
      }
    },
    mail: {
      silent: true,
      options: {
        port: 25,
        host: 'mail.afialapis.com',
        secure: false,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        } ,
      },
      defaults: {
        name: 'Miolo Demo App',
        from: 'devel@afialapis.com',
        to: 'devel@afialapis.com'
      }
    }
  }

  if (extraConfig) {
    config= merge(config, extraConfig)
  }

  return config
}

export default demo_server_make_config