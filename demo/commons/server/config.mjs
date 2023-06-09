import path from 'path'
import { fileURLToPath } from 'url'
import def_routes from './db/routes/index.mjs'
import passport from './auth/passport.mjs'
import basic_auth from './auth/basic.mjs'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const postgres = {
  dialect:  'postgres',
  host:     'localhost',
  port:     5432,
  database: 'miolo',
  user:     'postgres',
  password: 'postgres'
}

const sqlite = {
  dialect:  'sqlite',
  filename: ':memory:', // '/tmp/miolo.sqlite'
  verbose: true,
  cached: true
}


const demo_server_make_config = (buildFolder, authType= 'guest', dbType = 'postgres', extraConfig= undefined) => {

  let hstatic= {
    favicon: path.resolve(__my_dirname, 'static/img/favicon.ico'),
    folders: {
      '/static': path.resolve(__my_dirname, 'static')
    }
  }
  if (buildFolder) {
    hstatic.folders['/build']= buildFolder
  }


  const auth = 
      authType=='guest' ? {guest: {}}
    : authType=='basic' ? {basic: basic_auth}
    : {passport}

  let config= {
    http: {
      port: 8001,
      hostname: 'localhost',
      
      catcher_url: undefined, //'/sys/jserror',
      
      //
      // Folders to be mounted by koa for static content
      //
      static: hstatic,

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
      config: dbType=='postgres' ? postgres : sqlite,
      options:  {
        tables: extraConfig?.db?.options?.tables || [
          {
            name: 'todos',
            options: {
              useDateFields: false,
              //checkBeforeDelete: ["edition.agent_id"],
              //customHooks: {
              //  beforeInsert: beforeInsertTest,
              //  beforeUpdate: beforeUpdateTest
              //}
            } 
          }
        ],
        log: extraConfig?.db?.options?.log || 'warn'
      }
    },
    routes: extraConfig?.routes || def_routes,
    redis: {
      host: '127.0.0.1',
      port: 6379
    },    
    log: {
      level: extraConfig?.log?.level || 'info',
      format: {
        locale: 'es'
      },
      console: extraConfig?.log?.console || {
        enabled: true,
        level: 'info',
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
  
  return config
}

export default demo_server_make_config