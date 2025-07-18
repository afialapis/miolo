import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const dbConfig = {
  dialect:  'postgres',
  host:     'localhost',
  port:     5432,
  database: 'miolo',
  user:     'postgres',
  password: 'postgres'
}

const logLevel= 'warn'

export const config = {

  http: {
    port: 8001,
    hostname: 'localhost',
    
    catcher_url: undefined, //'/sys/jserror',
    
    //
    // Folders to be mounted by koa for static content
    //
    static: {
      favicon: path.resolve(__my_dirname, '../../../demo/server/static/img/favicon.ico'),
      //folders: {
      //  '/static': path.resolve(__my_dirname, 'static')
      //}        
    },

    cors: false,
    proxy: false
  },    
  db: {
    config: dbConfig,
    options: {
      log: logLevel
    }
  },
  log: {
    level: logLevel,
    console: { enabled: true, level: logLevel },
  },
  routes: {
    crud: [
      {
        prefix: '/api',
        bodyField: undefined,
        routes: ['test_01'],
      },
  
      {
        prefix: '/rebody',
        bodyField: 'rebody',
        routes: [{
          name: "test_01",
        }]
      }
    ],
  
    queries: [
      {
        prefix: '/noauth',
        routes: [{
          url: '/query',
          method: 'GET',
          callback: async (ctx) => {
            const conn = await ctx.miolo.db.get_connection()
            const res= await conn.selectOne('select * from test_01 where name = $1', ['Peter'], {})            
            ctx.body= res
          }
        }]
      },
      {
        prefix: '/auth',
        routes: [
          {
            url: '/query',
            method: 'GET',
            callback: (_ctx) => {},
            auth: {
              require: true,
              action: 'redirect',
              redirect_url: '/'
            }    
          }]
      }
    ]
  },
  auth: {
    guest: {

    }
  }
}

