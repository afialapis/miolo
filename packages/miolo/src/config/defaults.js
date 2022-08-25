const path = require('path')
const favicon = path.resolve(__dirname, '../server/static/ig/favicon.ico')

module.exports= {
  name: 'miolo',
  http: {
    port: 8001,
    hostname: 'localhost',
    
    static: {
      favicon: favicon,
      folders: {}
    }
  },
  session: {
    salt: 'SUPER_SALTY_YES?',
    secret: 'SUPER_SECRET_KEY_KERE',
    options: {
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: 86400000,
      
      /** (boolean) automatically commit headers (default true) */
      //autoCommit: true, 
      
      /** (boolean) can overwrite or not (default true) */
      //overwrite: true, 
      
      /** (boolean) httpOnly or not (default true) */
      //httpOnly: true, 
      
      /** (boolean) signed or not (default true) */
      //signed: true, 
      
      /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
      //rolling: false, 
      
      /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
      //renew: false, 

      /** (boolean) secure cookie*/
      secure: process.env.NODE_ENV != 'development', 
      
      /** (string) session cookie sameSite options (default null, don't set it) */
      sameSite: process.env.NODE_ENV != 'development' ? null : 'strict', 
    }
  },
  database: {
    db: {
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
    log: 'info'
  },
  routes: {
    body_field: undefined,
  
    getUserId: (ctx) => {
      try {
        const from_pport= ctx.state.user.id
        if (from_pport!=undefined) {
          return from_pport
        }
      } catch(e) {}
      try {
        const from_basic_auth= ctx.user.id
        if (from_basic_auth!=undefined) {
          return from_basic_auth
        }
      } catch(e) {}
      try {
        if (ctx.user.name == 'guest') {
          const from_guest_auth= ctx.user.token
          if (from_guest_auth!=undefined) {
            return from_guest_auth
          }
        }
      } catch(e) {}          
      let uid= ctx.headers['user-id']
      if (uid!=undefined) {
        return uid
      }
      return undefined
    },
  
    // authUser: {
    //   require: false,     // true / false / 'read-only'
    //   action: 'redirect', // 'error'
    //   redirect_url: '/',
    //   error_code: 401
    // }, 
    
    crud: {
      prefix: '',
      routes: '*'
    },
    queries: undefined
  },
  catcher: '/sys/jserror',
  cacher: {
    redis: {
      host: '127.0.0.1',
      port: 6379
    },
  },
  log: {
    level: 'debug',
    format: {
      locale: 'en-GB'
    },
    console: {
      enabled: true,
      level: 'silly',
    },
    file: {
      enabled: true,
      level: 'silly',
      filename: '/var/log/afialapis/miolo.log'
    },
    mail: {
      enabled: process.env.NODE_ENV === 'production',
      level: 'warn',
      name: 'miolo',
      from: 'miolo@afialapis.com',
      to: 'devel@afialapis.com'      
    }
  },
  mail: {
    silent: process.env.NODE_ENV !== 'production',
    options: {
      //
      // General options
      //
      // port – is the port to connect to (defaults to 587 is secure is false or 465 if true)
      port: 25,
      // host – is the hostname or IP address to connect to (defaults to ‘localhost’)
      host: 'mail.afialapis.com',
      // auth – defines authentication data 
      //        If authentication data is not present, the connection is considered authenticated from the start. 
      //        Otherwise you would need to provide the authentication options object.
      //   - type indicates the authetication type, defaults to ‘login’, other option is ‘oauth2’
      //   - user is the username
      //   - pass is the password for the user if normal login is used
      // authMethod – defines preferred authentication method, defaults to ‘PLAIN’
      authMethod: 'PLAIN',
      //
      // TLS options
      //
      // secure – if true the connection will use TLS when connecting to server.
      //          If false (the default) then TLS is used if server supports the STARTTLS extension.
      //          In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false
      //    ** Setting secure to false does not mean that you would not use an encrypted connection. Most SMTP servers allow 
      //       connection upgrade via STARTTLS command but to use this you have to connect using plaintext first
      secure: false,
      // tls – defines additional node.js TLSSocket options to be passed to the socket constructor, eg. {rejectUnauthorized: true}.
      tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false
      } ,
      // ignoreTLS – if this is true and secure is false then TLS is not used even if the server supports STARTTLS extension
      // ** ignoreTLS: false,
      // requireTLS – if this is true and secure is false then Nodemailer tries to use STARTTLS even 
      //              if the server does not advertise support for it. If the connection can not be encrypted then message is not sent
      // ** requireTLS: true,
      //
      // Connection options
      //
      // name – optional hostname of the client, used for identifying to the server, defaults to hostname of the machine
      // ** name: ,
      // localAddress – is the local interface to bind to for network connections
      // ** localAddress: ,
      // connectionTimeout – how many milliseconds to wait for the connection to establish
      // ** connectionTimeout: ,
      // greetingTimeout – how many milliseconds to wait for the greeting after connection is established
      // ** greetingTimeout: ,
      // socketTimeout – how many milliseconds of inactivity to allow
      // ** socketTimeout: ,
      //
      // Debug options
      //
      // logger – optional bunyan compatible logger instance. If set to true then logs to console. 
      //          If value is not set or is false then nothing is logged
      logger: false,
      // debug – if set to true, then logs SMTP traffic, otherwise logs only transaction events
      debug: false,
      //
      // Security options
      //
      // disableFileAccess – if true, then does not allow to use files as content. 
      //                     Use it when you want to use JSON data from untrusted source as the email.
      //                    If an attachment or message node tries to fetch something from a file the sending returns an error
      ////disableFileAccess: ,
      // disableUrlAccess – if true, then does not allow to use Urls as content
      // ** disableUrlAccess: ,

      //
      // Pooling options
      //
      // pool – see Pooled SMTP for details about connection pooling : https://nodemailer.com/smtp/pooled/
      //
      // Proxy options
      //
      // proxy – all SMTP based transports allow to use proxies for making TCP connections to servers.
      //         Read about proxy support in Nodemailer from here: https://nodemailer.com/smtp/proxies/

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
      name: 'miolo',
      from: 'miolo@afialapis.com',
      to: 'devel@afialapis.com'
    }
  },
  auth: {
    //basic: {
    //  auth_user: async (username, password) => { return {id: 1} },
    //  realm: '',
    //  paths: [],
    //},
    //passport: {
    //  get_user_id:  (user, done) => done(null, user.id), // default
    //  find_user_by_id: (id, done) => done(null, {id: 1}),  // ok=> done(null, user)  err=> done(error, null)
    //  local_auth_user: (username, password, done) => done(null, {id: 1})
    //                   // auth=> done(null, user) noauth=> done(null, false, {message: ''}) err=> done(error, null)
    //  url_login : '/login',
    //  url_logout: '/logout',
    //  url_login_redirect: undefined
    //  url_logout_redirect: '/'
    //}
    guest: {
      make_guest_token: undefined // (session) => ''
    }
  },
  middlewares: [
    // async (ctx) => {}
  ]
};

