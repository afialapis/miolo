# 1.1.3

try/catchs on email logger


# 1.1.1

`reopenTransportOnHupSignal` optional with `options.log.file.hup_patch`

# 1.1.0

Upgraded `xeira`, which means Node >= 21

# 1.0.6, 1.0.7

 * Cache: switch `redis` options to URL
 
# 1.0.5

 * Cache: fix `redis` options merge
 
# 1.0.4

 * upgrade `cacheiro` and `calustra`
 
# 1.0.3

 * Logger's `options.section` fix
 
# 1.0.2

 * Logger's `options.section` (and optional `options.indent`)
 
# 1.0.1

 * no big logs of Response body

# 1.0.0

 * peer depencies: `React` _^18.3.1_, `React Router DOM` _^6.29.0_.
 * upgraded `xeira` and all the tests

# 0.11.1

 * upd deps like `calustra`, `intre`, etc

# 0.10.2

 * Rely on miolo settings for cached session's ttl

# 0.10.1

 * Upgraded `cacheiro`
 * Session is cached on `cacheiro` and using `miolo` config.

# 0.10.0

 * `context.miolo.db.initConnection` is now `context.miolo.db.init_connection`
 * `context.miolo.db.getConnection` is now `context.miolo.db.get_connection`
 * `context.miolo.db.getModel` is now `context.miolo.db.get_model`
 * `context.miolo.db.dropConnection` is now `context.miolo.db.drop_connection`
 * `connection.getModel` is now `connection.get_model`
 * added `context.miolo.cache: {get_cache, get_cache_names,drop_cache,drop_caches}}`

 * upgraded `calustra` to `0.11.0`. After newer cache handling, `get_connection()`, `get_model()`, etc. are `async`.
 * upgraded every other dependency. Major version changes: @koa/cors, @maxmind/geoip2-node cron, winston-daily-rotate-file and nodemon.


# 0.10.3

 * fix config `geoip.local_ipds` typo
 * fix and make `geoip.local_ips` do something

# 0.10.2

 * Rely on miolo settings for cached session's ttl

# 0.10.1

 * session using cacheiro
 * lowercase methods, best demo scripts
 * cache options for calustra and custom
 * fix demo

# 0.10.0

 * upgraded calustra, getConnection/getModel are async

# 0.9.37

 * little ctx.ip fix

# 0.9.23

 * clean logs

# 0.9.22

 * added http.request.geoip

# 0.9.21

 * better option: http.request

# 0.9.20

 * extra middlewares receiving `(ctx, next)`

# 0.9.19

 * logger prefix using config.name
 * configurable request times coloring
 * save request.times: {
    elapsed (float, seconds),
    description ('ok', 'lazy' or 'slow')
  }

# 0.9.18

 * Cleaned some console.log on cron.
 * Router try{catch}s

# 0.9.17

 * Fixed useSsrData(.... modifier) parameter

# 0.9.16

 * Added useSsrData(.... modifier) parameter
