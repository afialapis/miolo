import path from 'path'
import {readFileSync} from 'fs'
import def_routes from './routes/index.mjs'
import credentials from './auth/credentials.mjs'
import basic_auth from './auth/basic.mjs'
import { loader } from './ssr/loader.mjs'

//const proot = (p) => path.join(process.env.NODE_ROOT, p)
const proot = (p) => path.join(process.cwd(), p)

export const makeConfig = (authType, logLevel= 'debug') => {
  const isProduction = process.env.NODE_ENV === 'production'

  const indexHTMLPath=  proot('cli/index.html') // proot(`cli/${isProduction ? 'index.html' : 'index.dev.html'}`)
  const indexHTML = readFileSync(indexHTMLPath, 'utf8').replace(/--AUTH_TYPE--/g, process.env.AUTH_TYPE || 'credentials')

  const auth = 
      authType=='guest' ? {guest: {}}
    : authType=='basic' ? {basic: basic_auth}
    : {credentials}

  const client = isProduction
    ? 'dist/cli/miolo-demo.iife.bundle.min.js'
    : 'cli/entry-cli.jsx'

  const server = isProduction
    ? proot('dist/server/entry-server.mjs')
    : 'server/ssr/entry-server.jsx'
  
  return {
    http: {
      port: 8001,
      hostname: 'localhost',
      catcher_url: '/sys/jserror',

      //
      // Folders to be mounted by koa for static content
      //
      static: {
        favicon: proot('server/static/img/favicon.ico'),
        folders: {
          '/static': proot('server/static'),
          '/dist': proot('dist')
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
        onTick: async (miolo, onComplete) => {
          miolo.logger.info('KRON Task - ticking')
        },
        onComplete: async (miolo) => {
          miolo.logger.info('KRON Task - completed')
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
      html: indexHTML,
      client,
      server,
      loader
    }, 
    vite: {
      base: '/',
      root: ''
    },
    dev: {
      watch: {
        dirs: [
          //path.join(process.cwd(), 'cli'),
          path.join(process.cwd(), 'server'),
          //path.join(process.cwd(), 'bin'),
        ]
      }
    }
  }
}
