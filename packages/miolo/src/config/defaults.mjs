import path from 'path'
const SESSION_MAX_AGE = 86400 * 10 * 1000


//
// Notice `miolo` has support for `.env` files
// If you want to use it, just create a `.env` file in the root of your project
// and set the variables you want to use.
// Then you can configure miolo using process.env.WHATEVER.


export default function make_config_defaults() {
  
  return {
    name: process.env.MIOLO_NAME || 'miolo',
    http: {
      port: process.env?.MIOLO_PORT || 8001,
      hostname: process.env?.IS_DOCKER === "true" 
        ? (process.env?.MIOLO_HOSTNAME_DOCKER || '0.0.0.0') 
        : (process.env?.MIOLO_HOSTNAME || 'localhost'),

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
      cors: process.env.MIOLO_HTTP_CORS==='true'
        ? true
        : process.env.MIOLO_HTTP_CORS==='simple'
        ? 'simple'
        : false,

      // proxy can be:
      //   - false
      //   - true      enable koa-proxies and use default options
      //   - {options} enable koa-proxies and use the custom options
      proxy: process.env.MIOLO_HTTP_PROXY==='true',

      ratelimit: {
        /* eslint-disable no-unused-vars */
        max: parseInt(process.env.MIOLO_RATELIMIT_MAX || 1000),
        duration: parseInt(process.env.MIOLO_RATELIMIT_DURATION || 60 * 1000), // miliseconds
        errorMessage: 'Rate Limit reached',      
        //whitelist: (ctx) => false,
        //blacklist: (ctx) => false,
        whitelist_ips: process.env.MIOLO_RATELIMIT_WHITELIST_IPS?.split(',') || [],
        blacklist_ips: process.env.MIOLO_RATELIMIT_BLACKLIST_IPS?.split(',') || [],
        ipsum_folder: '/var/ipsum' // https://github.com/stamparm/ipsum
      },

      request: {
        lazy: parseInt(process.env.MIOLO_REQUEST_LAZY || 1), // seconds to consider lazy a request
        slow: parseInt(process.env.MIOLO_REQUEST_SLOW || 2), // seconds to consider slow a request
        onStart: undefined,
        // (ctx, times) => { return begin_result}
        onDone: undefined,
        // (ctx, begin_result, times) => {},
        geoip: {
          enabled: process.env.MIOLO_GEOIP_ENABLED==='true',
          db: process.env.MIOLO_GEOIP_DB,
          local_ips: process.env.MIOLO_GEOIP_LOCAL_IPS?.split(',') || [
            '127.0.0.1'
          ]
        }
      }
      
    },
    session: {
      salt: process.env.MIOLO_SESSION_SALT || 'SUPER_SALTY_YES?',
      secret: process.env.MIOLO_SESSION_SECRET || 'SUPER_SECRET_KEY_KERE',
      options: {
        /** (string) cookie key (default is koa.sess) */
        key: process.env.MIOLO_SESSION_KEY || `${process.env.MIOLO_NAME || 'koa'}.sess`,
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: parseInt(process.env.MIOLO_SESSION_MAX_AGE || SESSION_MAX_AGE),
        
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
        renew: process.env?.MIOLO_SESSION_RENEW === 'true', 

        /** (boolean) secure cookie*/
        /** You may want to set it as true in your Production environement,
         *  while false at DEV time.
         */
        secure: process.env?.MIOLO_SESSION_SECURE === 'true',
        
        /** (string) session cookie sameSite options (default null, don't set it) */
        sameSite: process.env.MIOLO_SESSION_SAME_SITE || 'lax', // 'strict', 
      }
    },
    db: {
      config: {
          dialect:  process.env.MIOLO_DB_DIALECT || 'postgres',
          host:     process.env?.IS_DOCKER === "true" 
                    ? (process.env.MIOLO_DB_DOCKER_HOST || 'postgres')
                    : (process.env.MIOLO_DB_HOST || 'localhost'),
          port:     process.env.MIOLO_DB_PORT || 5432,
          database: process.env.MIOLO_DB_DATABASE || 'miolo',
          user:     process.env.MIOLO_DB_USER || 'postgres',
          password: process.env.MIOLO_DB_PASSWORD || 'postgres',
          // Maximum number of connection in pool
          max:      parseInt(process.env.MIOLO_DB_POOL_MAX || 5),
          // Minimum number of connection in pool
          min:      parseInt(process.env.MIOLO_DB_POOL_MIN || 0),
          // The maximum time, in milliseconds, that a connection can be idle before being released. 
          // Use with combination of evict for proper working,
          //   for more details read https://github.com/coopernurse/node-pool/issues/178#issuecomment-327110870,
          idleTimeoutMillis: parseInt(process.env.MIOLO_DB_POOL_IDLE_TIMEOUT_MS || 10000), 
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
      level: process.env.MIOLO_LOG_LEVEL || 'debug',
      format: {
        locale: 'en-GB'
      },
      console: {
        enabled: process.env.MIOLO_LOG_CONSOLE_ENABLED === 'true',
        level: process.env.MIOLO_LOG_CONSOLE_LEVEL || process.env.MIOLO_LOG_LEVEL || 'debug',
      },
      file: {
        enabled: process.env.MIOLO_LOG_FILE_ENABLED === 'true',
        level: process.env.MIOLO_LOG_FILE_LEVEL || process.env.MIOLO_LOG_LEVEL || 'debug',
        filename: process.env.MIOLO_LOG_FILE_PATH || '/var/log/afialapis/%MIOLO%.log',
        
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
        enabled: process.env.MIOLO_LOG_MAIL_ENABLED 
        ? process.env.MIOLO_LOG_MAIL_ENABLED === 'true' 
        : false,
        level: process.env.MIOLO_LOG_MAIL_LEVEL || process.env.MIOLO_LOG_LEVEL || 'warn',
        name: process.env.MIOLO_NAME || 'miolo',
        from: process.env.MIOLO_LOG_MAIL_FROM || 'noreply@mail.com',
        to: process.env.MIOLO_LOG_MAIL_TO || 'noreply@mail.com'      
      }
    },
    mail: {
      silent: process.env.MIOLO_MAILER_SILENT === 'true',
      options: {
        //
        // General options
        //
        // port – is the port to connect to (defaults to 587 is secure is false or 465 if true)
        port: parseInt(process.env.MIOLO_MAILER_PORT || 25),
        // host – is the hostname or IP address to connect to (defaults to ‘localhost’)
        host: process.env.MIOLO_MAILER_HOST || 'mail.com',
        // auth – defines authentication data 
        //        If authentication data is not present, the connection is considered authenticated from the start. 
        //        Otherwise you would need to provide the authentication options object.
        //   - type indicates the authetication type, defaults to ‘login’, other option is ‘oauth2’
        //   - user is the username
        //   - pass is the password for the user if normal login is used
        // authMethod – defines preferred authentication method, defaults to ‘PLAIN’
        authMethod: process.env.MIOLO_MAILER_AUTH_METHOD || 'PLAIN',
        ... process.env.MIOLO_MAILER_AUTH_METHOD === 'LOGIN'
          ? {
            auth: {
              user: process.env.MIOLO_MAILER_SMTP_USER || 'noreply@mail.com',
              pass: process.env.MIOLO_MAILER_SMTP_PASS || '****',
              type: 'login',
            },
            secure: true,
          }
          : {
            secure: false
          },

        //
        // TLS options
        //
        // secure – if true the connection will use TLS when connecting to server.
        //          If false (the default) then TLS is used if server supports the STARTTLS extension.
        //          In most cases set this value to true if you are connecting to port 465. For port 587 or 25 keep it false
        //    ** Setting secure to false does not mean that you would not use an encrypted connection. Most SMTP servers allow 
        //       connection upgrade via STARTTLS command but to use this you have to connect using plaintext first
      
        
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
        name: process.env.MIOLO_NAME || 'miolo',
        from: process.env.MIOLO_MAILER_FROM || 'noreply@mail.com',
        to: process.env.MIOLO_MAILER_TO || 'noreply@mail.com'
      }
    },
    auth: {
      //basic: {
      //  auth_user: async (username, password) => { return {id: 1} },
      //  realm: '',
      //  paths: [],
      //},
      //credentials: {
      //  get_user_id:  (user, done, ctx) => done(null, user.id), // default
      //  find_user_by_id: (id, done, ctx) => done(null, {id: 1}),  // ok=> done(null, user)  err=> done(error, null)
      //  local_auth_user: (username, password, done, ctx) => done(null, {id: 1})
      //                   auth  => done(null, user) 
      //                   noauth=> done(null, false, {message: ''}) 
      //                   err   => done(error, null)
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
        type: process.env.MIOLO_CACHE_TYPE || 'combined',
        redis: {
          host: process.env?.IS_DOCKER === "true" 
          ? (process.env.MIOLO_REDIS_HOSTNAME_DOCKER || 'redis')
          : (process.env.MIOLO_REDIS_HOSTNAME || '127.0.0.1'),
          port: parseInt(process.env.MIOLO_REDIS_PORT || 6379)
        },
        version: parseInt(process.env.MIOLO_CACHE_VERSION || 1),
        clean: false,
      },
      
      // specific cache options for calustra
      calustra: {
        namespace: 'miolo-calustra',
        ttl: parseInt(process.env.MIOLO_CACHE_CALUSTRA_TTL || 86400*1000),
        version: parseInt(process.env.MIOLO_CACHE_CALUSTRA_VERSION || process.env.MIOLO_CACHE_VERSION || 1)
      },

      // specific cache options for koa-session
      session: {
        namespace: 'miolo-session',
        ttl: parseInt(process.env.MIOLO_CACHE_SESSION_TTL || process.env.MIOLO_SESSION_MAX_AGE || SESSION_MAX_AGE),
        version: parseInt(process.env.MIOLO_CACHE_SESSION_VERSION || process.env.MIOLO_CACHE_VERSION || 1)
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

    build: {
      
      client: process.env.NODE_ENV === 'production'
        ? `${process.env.MIOLO_BUILD_CLIENT_DEST || './dist/cli'}/${process.env.MIOLO_NAME || 'miolo'}.${process.env.MIOLO_BUILD_CLIENT_SUFFIX || 'iife.bundle.min'}.js`
        : process.env.MIOLO_BUILD_CLIENT_ENTRY,
      
      html: process.env.MIOLO_BUILD_HTML_FILE || './src/cli/index.html',

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
        server: process.env.NODE_ENV === 'production'
          ? path.join(process.cwd(), `${process.env.MIOLO_BUILD_SERVER_DEST || './dist/server'}/entry-server.js`)
          : process.env.MIOLO_BUILD_SERVER_SSR_ENTRY || './src/server/ssr/entry-server.jsx',
        // loader: async (ctx) => {}
      },

      dev: {
        watcher: {
          enabled: process.env.MIOLO_DEV_WATCH_ENABLED==='true',
          dirs: process.env.MIOLO_DEV_WATCH_DIRS?.split(',')?.map(dir => path.join(process.cwd(), dir)) || [],
        },
      }
    }
  }
}


