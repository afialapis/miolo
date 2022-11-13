const main = require('../../config/main')

const path = require('path')
const root = (dir) => path.resolve(__dirname, '../../..', dir)

const routes = require('../db/routes')
const passport = require('../auth/passport')

module.exports = {
  http: {
    port: main.port,
    hostname: main.hostname,
    
    //
    // Folders to be mounted by koa for static content
    //
    static: {
      favicon: root('src/cli/static/img/favicon.ico'),
      folders: {
        '/build': root('build'),
        '/static': root('src/cli/static')
      }
    }
  },
  session: {
    salt: 'SUPER_SALTY_YES?',
    secret: 'SUPER_SECRET_KEY_KERE',
    options: {
      maxAge: 86400000
    }
  },  
  database: {
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
  routes: routes,
  catcher: 'sys/jserror',
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  
  log: {
    level: 'debug',
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

      /* TESTED */
      /*
      port: 465,
      host: 'mail.afialapis.com',
      auth: {
        user: 'devel@afialapis.com',
        pass: '***',
        type: 'login',
      },      
      secure: true,
      tls: {
        rejectUnauthorized: false
      } ,
      */

    },
    defaults: {
      name: 'Bonages',
      from: 'bonafide@afialapis.com',
      to: 'devel@afialapis.com'
    }
  },
  auth: {
    guest: {},
    //basic: {
    //  auth_user: async (username, password) => { return false /*{id: 1}*/ },
    //  realm: 'demo.demo',
    //  paths: ['/api']
    //},
    //passport
  }
}
