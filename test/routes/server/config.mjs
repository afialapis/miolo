// import path from 'path'
// import { fileURLToPath } from 'url'
// const __my_filename = fileURLToPath(import.meta.url)
// const __my_dirname = path.dirname(__my_filename)


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

export const makeConfig = (dbType) => {
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
    db: {
      config: dbType==='postgres' ? postgres : sqlite,
      tables: [
        {
          name: 'test_01',
          schema: 'public',
          useDateFields: {
            use: true,
            fieldNames: {
              created_at: 'created_at', 
              last_update_at: 'last_update_at'
            },
            now: () => 999
          },
          triggers: {
            // eslint-disable-next-line
            afterInsert: async (conn, id, params, options) => {
              return 777
            }
          }
        }
      ],
      log: 'error',
    },
    log: {
      level: 'none',
      console: { enabled: true, level: 'none' },
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
              const conn= ctx.miolo.db.getConnection()
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
}
