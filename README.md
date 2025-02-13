# miolo
[![NPM Version](https://badge.fury.io/js/miolo.svg)](https://www.npmjs.com/package/miolo)
[![NPM Downloads](https://img.shields.io/npm/dm/miolo.svg?style=flat)](https://www.npmjs.com/package/miolo)

![miolo logo](https://www.afialapis.com/os/miolo/logo.png)

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

[`miolo`](https://www.afialapis.com/os/miolo) is an all-in-one koa-based server.


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

See [changelog here](https://github.com/afialapis/miolo/blob/main/CHANGELOG.md)
