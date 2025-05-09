const SESSION_MAX_AGE = 86400 * 10 * 1000

export default {
  name: 'miolo',
  http: {
    port: 8001,
    hostname: 'localhost',

    catcher_url: '/sys/jserror',
    
    static: {
      favicon: '',
      folders: {}
    },
    
    // cors can be:
    //   - false
    //   - simple    (just assign Access-Control-Allow-Origin='*' and Access-Control-Expose-Headers='SourceMap,X-SourceMap'
    //   - true      enable @koa/cors
    //   - {options} enable @koa/cors and use the custom options
    //
    cors: 'simple',

    // proxy can be:
    //   - false
    //   - true      enable koa-proxies and use default options
    //   - {options} enable koa-proxies and use the custom options
    proxy: false,

    ratelimit: {
      /* eslint-disable no-unused-vars */
      max: 1000,
      duration: 60 * 1000, // miliseconds
      errorMessage: 'Rate Limit reached',      
      //whitelist: (ctx) => false,
      //blacklist: (ctx) => false,
      whitelist_ips: [],
      blacklist_ips: [],
      ipsum_folder: '/var/ipsum' // https://github.com/stamparm/ipsum
    },

    request: {
      lazy: 1, // seconds to consider lazy a request
      slow: 2, // seconds to consider slow a request
      onStart: undefined,
      // (ctx, times) => { return begin_result}
      onDone: undefined,
      // (ctx, begin_result, times) => {},
      geoip: {
        enabled: false,
        db: '/var/lib/GeoIP/GeoLite2-City.mmdb',
        local_ips: [
          '127.0.0.1'
        ]
      }
    }
    
  },
  session: {
    salt: 'SUPER_SALTY_YES?',
    secret: 'SUPER_SECRET_KEY_KERE',
    options: {
      /** (number || 'session') maxAge in ms (default is 1 days) */
      /** 'session' will result in a cookie that expires when session/browser is closed */
      /** Warning: If a session cookie is stolen, this cookie will never expire */
      maxAge: SESSION_MAX_AGE,
      
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
      /** You may want to set it as true in your Production environement,
       *  while false at DEV time.
       */
      secure: true, 
      
      /** (string) session cookie sameSite options (default null, don't set it) */
      sameSite: 'lax', // 'strict', 
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
      tables: []

      // cache:
      // Refer to top level cache option
      // cache: {...}
      
      // log:
      // We will pass, on the fly, miolo logger to calustra
      // But specifying a level here, we can customize the level only for db/calustra actions
      // log: 'silly', 
    }
  },
  routes: {
    bodyField: undefined,
  
    // auth: {
    //   require: false,     // true / false / 'read-only'
    //   action: 'redirect', // 'error'
    //   redirect_url: '/',
    //   error_code: 401
    // }, 
    // before: async (ctx) => {return bool} // If bool false, query callback not run
    // after : async (ctx, result) => {return modified_result}
    
    crud: [{
      prefix: '',
      routes: [/*
        name: '',
        url: '/../..', // default to 'name'
        mode: 'r/w/rw',
        bodyField: '',

        useUserFields: {
          use: false,
          fieldNames: {
            created_by: 'created_by', 
            last_update_by: 'last_update_by'
          }
        }
        auth: ...,
        before: ...,
        after : ...
      */], 
    }],
    queries: [/*
      {
        prefix: '',
        auth: ...,
        before: ...,
        after : ...

        routes: [
          {
            url: '/../..',
            method: 'GET/POST',
            callback: async (ctx) => { ctx.body = result } ,  
             // or
            callback_fn: async (miolo, params) => { return result } ,  
            auth: ...,
            before: ...,
            after : ...
          },          
        ], 
      },
    */],
  },
  log: {
    level: 'debug',
    format: {
      locale: 'en-GB'
    },
    console: {
      enabled: true,
    },
    file: {
      enabled: true,

      filename: '/var/log/afialapis/%MIOLO%.log',
      
      //frequency: undefined,
      //datePattern: 'YYYY-MM-DD',
      zippedArchive: true,

      maxsize: 1024 * 1024 * 20,
      maxFiles: 20,

      //maxSize: '20m',
      ///maxFiles: '10d',

      //filename: '/var/log/afialapis/%MIOLO%.%DATE%.log',
      //auditFile: '/var/log/afialapis/%MIOLO%.audit.json',
      //createSymlink: true,
      //symlinkName: '%MIOLO%.log'

      hup_patch: false
    },
    mail: {
      enabled: false,
      level: 'warn',
      name: 'miolo',
      from: 'miolo@mail.com',
      to: 'errors@mail.com'      
    }
  },
  mail: {
    silent: true,
    options: {
      //
      // General options
      //
      // port – is the port to connect to (defaults to 587 is secure is false or 465 if true)
      port: 25,
      // host – is the hostname or IP address to connect to (defaults to ‘localhost’)
      host: 'mail.com',
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
    },
    defaults: {
      name: 'miolo',
      from: 'miolo@mail.com',
      to: 'errors@mail.com'
    }
  },
  auth: {
    //basic: {
    //  auth_user: async (username, password) => { return {id: 1} },
    //  realm: '',
    //  paths: [],
    //},
    //credentials: {
    //  get_user_id:  (user, done, miolo) => done(null, user.id), // default
    //  find_user_by_id: (id, done, miolo) => done(null, {id: 1}),  // ok=> done(null, user)  err=> done(error, null)
    //  local_auth_user: (username, password, done, miolo) => done(null, {id: 1})
    //                   // auth=> done(null, user) noauth=> done(null, false, {message: ''}) err=> done(error, null)
    //  url_login : '/login',
    //  url_logout: '/logout',
    //  url_login_redirect: undefined
    //  url_logout_redirect: '/'
    //}
    //guest: {
    //  make_guest_token: undefined // (session) => ''
    //},
    //custom: callback,
    //  here callback receives (app)
    //  and returns:
    //    - a middleware function
    //    or
    //    - an array like [{
    //        method: 'GET' // POST,...
    //        url:    '/aa/bb',
    //        callback: a middleware function
    //      }, ...]
  },
  middlewares: [
    // async (ctx, next) => {}
    // Remember to call `await next()`
  ],
  cron: [
    // {
    //   name,
    //   cronTime, 
    //   onTick: async (miolo, onComplete),
    //      Notice that if task runs too fast, you may see that
    //       onTick is actually never run, but onComplete is.
    //      Consider passing a higher interval on cronTime
    //   onComplete: async (miolo),
    //   timezone, context, runOnInit, utcOffset, unrefTimeout
    // }
    // check https://github.com/kelektiv/node-cron#readme
    //
    // https://crontab.guru/
  ],

  cache: {
    // Default options passed to cacheiro for
    // every other cache
    default: {
      type: 'combined',
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
      version: 1,
      clean: false,
    },
    
    // specific cache options for calustra
    calustra: {
      namespace: 'miolo-calustra',
      ttl: 86400*1000,
    },

    // specific cache options for koa-session
    session: {
      namespace: 'miolo-session',
      ttl: SESSION_MAX_AGE,
    },
    
    // custom cache instances
    // will be inited by miolo, and available through ctx.miolo.cache.get_cache('name')
    custom: {
     // <name>: {options}
    }


  },

  socket: {
    enabled: false,
    cli: {
      /**
       domain: '',
       options: {}
       */
    }
    /*
    connection: (socket) => {},
    new_namespace: (namespace) => {},
    namespaces: [{  
      name,
      listener: (data) => {}
    }]
    */
  },

  // vite: false, 
  vite: {
    base: '/',
    root: '',
    watch: {
      // During tests we edit the files too fast and sometimes chokidar
      // misses change events, so enforce polling for consistency
      usePolling: true,
      interval: 100,
    }, 
  },
    
  ssr: {
    client: 'cli/index.jsx',
    server: 'server/index.jsx',
    // html: '',
    // loader: async (ctx) => {}
  },

  dev: {
    watcher: {
      enabled: true,
      // dirs: []    By default, server's entry dir
    },
  }
};

