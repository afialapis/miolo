API

blablabla


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
                 

