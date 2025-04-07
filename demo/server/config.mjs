import path from 'path'
import {readFileSync} from 'fs'
import { fileURLToPath } from 'url'
import def_routes from './routes/index.mjs'
import credentials from './auth/credentials.mjs'
import basic_auth from './auth/basic.mjs'
import { loader } from './ssr/loader.mjs'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)



export const makeConfig = (authType, logLevel= 'debug') => {
  const indexHTMLPath=  path.resolve(__my_dirname, `../cli/${authType}/index.html`)
  const indexHTML = readFileSync(indexHTMLPath, 'utf8')

  const auth = 
      authType=='guest' ? {guest: {}}
    : authType=='basic' ? {basic: basic_auth}
    : {credentials}

  const client = authType=='guest'
    ? 'cli/guest/index.jsx'
    : authType=='basic'
    ? 'cli/basic/index.jsx'
    : 'cli/credentials/index.jsx'

  const server = authType=='guest'
    ? 'server/ssr/entry-guest.jsx'
    : authType=='basic'
    ? 'server/ssr/entry-basic.jsx'
    : 'server/ssr/entry-credentials.jsx'    

  return {
    http: {
      port: 8001,
      hostname: 'localhost',
      catcher_url: '/sys/jserror',
      
      //
      // Folders to be mounted by koa for static content
      //
      static: {
        favicon: path.resolve(__my_dirname, 'static/img/favicon.ico'),
        folders: {
          '/static': path.resolve(__my_dirname, 'static'),
          '/build': path.resolve(__my_dirname, '../build')
        }        
      },

      cors: false,
      proxy: false,

      request: {
        geoip: {
          enabled: true
        }
      }
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
        //log: logLevel
      },
    },
    log: {
      level: logLevel,
      console: { enabled: true, level: logLevel },
      file: {enabled: true, level: logLevel},
      mail: {enabled: true, level: 'warn'}
    },
    mail: {silent: false},
    routes: def_routes,
    auth,
    cron: [
      {
        name: 'KRON',
        cronTime: '*/3 * * * *', 
        onTick: (miolo, onComplete) => {
          
          miolo.logger.warn('KRON Task - ticking')

        },
        onComplete: (miolo) => {
          miolo.logger.warn('KRON Task - completed')
        },
        start: true
      }
    ],
    //socket: {
    //  enabled: true,
    //  
    //  connection: (socket) => {console.warn('connected'); console.warn(socket)},
    //  //new_namespace: (namespace) => {},
    //  
    //}    


    ssr: {
      //html: indexHTML,
      client,
      server,
    }, 
    vite: {
      base: '/',
      root: 'demo'
    }
  }
}
