import path from 'path'
import def_routes from '#server/routes/index.mjs'
import passport from '#server/auth/passport.mjs'
import basic_auth from '#server/auth/basic.mjs'
import { miolo_demo_ssr_loader_make } from '#server/ssr/loader.mjs'

const proot = (p) => path.join(process.cwd(), p)

export default function makeConfig () {
  const authMode = process.env.MIOLO_DEMO_AUTH_MODE || 'guest'

  const auth = 
      authMode=='guest' ? {guest: {}}
    : authMode=='basic' ? {basic: basic_auth}
    : {passport}

  return{
    http: {
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
    db: {
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
        }]
      },
    },
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
    build: {
      ssr: {
        loader: miolo_demo_ssr_loader_make(authMode)
      },
      //vite: {
      //  resolve: {
      //    alias: {
      //      "@": path.resolve(proot('cli')),
      //    },
      //  },        
      //}
    }
  }
}

