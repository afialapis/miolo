![miolo logo](https://www.afialapis.com/os/miolo/logo.png)
[![NPM Version](https://badge.fury.io/js/miolo.svg)](https://www.npmjs.com/package/miolo)
[![NPM Downloads](https://img.shields.io/npm/dm/miolo.svg?style=flat)](https://www.npmjs.com/package/miolo)


---

> **miolo**. substantivo masculino plural:

> **1.** popular **Encéfalo.**

> _Disque aínda se vían os miolos esparexidos polo chan._


> **2. Parte interior do pan.**

> _Prefiro o miolo á codia._


> **4.** figurado **Parte fundamental ou máis importante de algo.**

> _O miolo da cuestión non é ese._


---

# Intro


## Server middleware

## init

```miolo(config, render)```

config: ver defaults.js

render:
	undefined         => renderiza un html fallback
	html     (string) => renderiza ese HTML
	middleware        => renderiza HTML con posibilidad de SSR


### Custom `ctx` properties

  ctx.request.body => instead of ctx.request.fields (default on koa-better-body)
  ctx.request.ip

  From koa-passport:

  ctx.isAuthenticated()
  ctx.isUnauthenticated()
  await ctx.login()
  ctx.logout()
  ctx.state.user

  From auth:
    ctx.session.user
    ctx.session.authenticated
    ctx.session.token (if guest auth)
                 



# Changelog

## 0.10.1
- Upgraded `cacheiro`
- Session is cached on `cacheiro` and using `miolo` config.

## 0.10.0
- `context.miolo.db.initConnection` is now `context.miolo.db.init_connection`
- `context.miolo.db.getConnection` is now `context.miolo.db.get_connection`
- `context.miolo.db.getModel` is now `context.miolo.db.get_model`
- `context.miolo.db.dropConnection` is now `context.miolo.db.drop_connection`
- `connection.getModel` is now `connection.get_model`
- added `context.miolo.cache: {get_cache, get_cache_names,drop_cache,drop_caches}}`

- upgraded `calustra` to `0.11.0`. After newer cache handling, `get_connection()`, `get_model()`, etc. are `async`.
- upgraded every other dependency. Major version changes: @koa/cors, @maxmind/geoip2-node cron, winston-daily-rotate-file and nodemon.