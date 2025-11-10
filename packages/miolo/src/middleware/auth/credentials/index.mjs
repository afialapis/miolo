/* eslint-disable no-unused-vars*/
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import Router from '@koa/router'
import { init_session_middleware } from './session/index.mjs'

// passport: {
//   get_user_id:     (user, done) => done(null, user.id), // default
//   find_user_by_id: (id, done) => done(null, {id: 1}),  // ok=> done(null, user)  err=> done(error, null)
//   local_auth_user: (username, password, done) => done(null, {id: 1})
//                    // auth=> done(null, user) noauth=> done(null, false, {message: ''}) err=> done(error, null)
// }


const def_get_user_id = (user, done, ctx) => done(null, user.id)

const def_find_user_by_id = (id, done, ctx) => {
  const err = Error('You need to define auth.passport.find_user_by_id')
  done(err, null)
}

const def_local_auth_user = (username, password, done, ctx) => {
  const err = Error('You need to define auth.passport.local_auth_user')
  done(err, null)
}


const init_credentials_auth_middleware = ( app, options, sessionConfig, cacheConfig) => {
  const {get_user_id, find_user_by_id, local_auth_user, 
         url_login, url_logout, url_login_redirect, url_logout_redirect} = options

  //const local_options = {}

  // fallback funcs
  const get_user_id_f = get_user_id || def_get_user_id
  const find_user_by_id_f = find_user_by_id || def_find_user_by_id
  const local_auth_user_f = local_auth_user || def_local_auth_user
  const url_login_f = url_login || '/login'
  const url_logout_f = url_logout || '/logout'
  
  // init passport
  const serialize_user = (ctx) => (user, done) => {
    process.nextTick(function() {
      try {
        ctx.miolo.logger.debug(`[auth] serializing user...`)
        ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
        return get_user_id_f(user, done, ctx)
      } catch(error) {
        ctx.miolo.logger.error(`[auth] Error serializing user: ${error}`)
        return done(error, null)
      }
    })
  }

  const deserialize_user = (ctx) => (id, done) => {
    process.nextTick(function() {
      try {
        ctx.miolo.logger.debug(`[auth] deserializing user...`)
        ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
        return find_user_by_id_f(id, done, ctx)
      } catch(error) {
        ctx.miolo.logger.error(`[auth] Error deserializing user: ${error}`)
        return done(error, null)
      }
    })
  }

  const local_strategy= (ctx) => new LocalStrategy.Strategy (
    (username, password, done) => {
      ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
      return local_auth_user_f(username, password, done, ctx)
  })

  app.use((ctx, next) => {
    passport.serializeUser(serialize_user(ctx));
    passport.deserializeUser(deserialize_user(ctx));
    passport.use(local_strategy(ctx));
    return next();
  });
  

  init_session_middleware(app, sessionConfig, cacheConfig)
  
  app.use(passport.initialize())
  app.use(passport.session())

  async function _ensure_ctx_user (ctx, next) {
    try{
      if (ctx.session.authenticated) {
        ctx.session.user = ctx.state.user
      }
    } catch(_) {}  
    await next()
  }
  app.use(_ensure_ctx_user)

  // handle auth routes
  const handleLogIn = (ctx, next) => {
    return passport.authenticate('local', async function(err, user, info, _status) {
      if (user === false) {
        ctx.session.user = undefined
        ctx.session.authenticated = false
        ctx.sessionId = undefined

        // This will show error logs on the catcher middleware
        // ctx.throw(401)
        
        ctx.status= 401

        ctx.body = { 
          ok: err==undefined,
          data: {
            user: undefined,
            authenticated: false,
            info: info,
          },
          error: err
        }
      } else {
        await ctx.login(user)
        ctx.session.user = user // ctx.state.user
        ctx.session.authenticated = true
        
        ctx.body = { 
          ok: true,
          data: {
            user : user,
            authenticated: true
          }
        }

        if (url_login_redirect!=undefined) {
          ctx.redirect(url_login_redirect)
        }
      }
    })(ctx)
  }

  const handleLogOut = async (ctx, next) => {
    if (ctx.session.authenticated) {
      ctx.session.user = undefined
      ctx.session.authenticated = false
      ctx.sessionId = undefined

      ctx.body = { 
        ok: true,
        data: {
          user: undefined,
          authenticated: false 
        }
      }
        
      if (url_logout_redirect!=undefined) {
        ctx.redirect(url_logout_redirect)
      } else {
        await ctx.logout()
      }  
    } else {
      // This will show error logs on the catcher middleware
      // ctx.throw(401)
      
      ctx.status= 401
      ctx.body = { 
        ok: true,
        data: {
          user: undefined,
          authenticated: false 
        }
      }
    }
  }
  
  // Init the router
  const login_router = new Router()
  login_router.post(url_login_f,  handleLogIn)
  login_router.get (url_logout_f, handleLogOut)
  login_router.post(url_logout_f, handleLogOut)
  
  app.use(login_router.routes()) 

}

export {init_credentials_auth_middleware}
