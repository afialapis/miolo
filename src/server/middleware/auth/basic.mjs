import koa_mount from 'koa-mount'
import auth from 'basic-auth'

const init_basic_auth_middleware = ( app, options ) => {
  let {auth_user, realm, paths} = options
  if (! realm) {
    realm = 'Secure Area'
  }

  async function basic_auth_middleware(ctx, next) {
    const au_user = auth(ctx)

    const unauth_err = () => {
      // This will show error logs on the catcher middleware
      //return ctx.throw(
      //  401,
      //  null,
      //  {
      //    headers: {
      //      'WWW-Authenticate': 'Basic realm="' + realm.replace(/"/g, '\\"') + '"'
      //    }
      //  }
      //)

      ctx.session= {
        user: undefined,
        authenticated: false
      }

      ctx.body= {}
      ctx.response.status= 401
      ctx.response.body = 'Unauthorized'
      ctx.response.headers['WWW-Authenticate']= 'Basic realm="' + realm.replace(/"/g, '\\"') + '"'
    }

    if (! au_user) {
      return unauth_err()
    }
    
    const user = await auth_user(au_user.name, au_user.pass, app.context.miolo)

    if (user === false || user == undefined) {
      return unauth_err()
    }

    ctx.session= {
      user,
      authenticated: true
    }

    await next()
  }

  if (paths == undefined || paths.length == 0) {
    app.use(basic_auth_middleware)
  } else {
    paths.map(p => 
      app.use(koa_mount(p, basic_auth_middleware))
    )
  }

}

export {init_basic_auth_middleware}
