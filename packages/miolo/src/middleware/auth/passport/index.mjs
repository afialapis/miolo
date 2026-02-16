/* eslint-disable no-unused-vars*/
import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import Router from '@koa/router'
import { init_session_middleware } from './session/index.mjs'

// local: {
//   get_user_id:     (user, done) => done(null, user.id), // default
//   find_user_by_id: (id, done) => done(null, {id: 1}),  // ok=> done(null, user)  err=> done(error, null)
//   local_auth_user: (username, password, done) => done(null, {id: 1})
//                    // auth=> done(null, user) noauth=> done(null, false, {message: ''}) err=> done(error, null)
//   local_url_login : '/login',
//   local_url_logout: '/logout',
//   local_url_login_redirect: undefined
//   local_url_logout_redirect: '/'
//   google_auth_user: (accessToken, refreshToken, profile, done, ctx) => done(null, {id: 1})
//                    // auth=> done(null, user) noauth=> done(null, false, {message: ''}) err=> done(error, null)
//   google_client_id: 'your-google-client-id',
//   google_client_secret: 'your-google-client-secret',
//   google_url_login : '/auth/google',
//   google_url_callback : '/auth/google/callback',
//   google_url_logout: '/logout',
//   google_url_login_redirect: undefined
//   google_url_logout_redirect: '/'
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

const def_google_auth_user = (accessToken, refreshToken, profile, done, ctx) => {
  const err = Error('You need to define auth.passport.google_auth_user')
  done(err, null)
}


const init_passport_auth_middleware = ( app, options, sessionConfig, cacheConfig) => {
  const {get_user_id, find_user_by_id, local_auth_user, 
         local_url_login, local_url_logout, local_url_login_redirect, local_url_logout_redirect, google_auth_user,
         google_client_id, google_client_secret, 
         google_url_login, google_url_callback, google_url_logout, google_url_login_redirect, google_url_logout_redirect} = options

  //const local_options = {}

  // fallback funcs
  const get_user_id_f = get_user_id || def_get_user_id
  const find_user_by_id_f = find_user_by_id || def_find_user_by_id
  const local_auth_user_f = local_auth_user || def_local_auth_user
  const local_url_login_f = local_url_login || '/login'
  const local_url_logout_f = local_url_logout || '/logout'
  const google_auth_user_f = google_auth_user || def_google_auth_user
  
  const google_url_login_f = google_url_login || '/auth/google'
  const google_url_callback_f = google_url_callback || '/auth/google/callback'
  const google_url_logout_f = google_url_logout || '/logout'  
  
  
  // init passport
  const serialize_user = (ctx) => (user, done) => {
    process.nextTick(function() {
      try {
        ctx.miolo.logger.debug(`[auth][local] serializing user...`)
        ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
        return get_user_id_f(user, done, ctx)
      } catch(error) {
        ctx.miolo.logger.error(`[auth][local] Error serializing user: ${error}`)
        return done(error, null)
      }
    })
  }

  const deserialize_user = (ctx) => (id, done) => {
    process.nextTick(function() {
      try {
        ctx.miolo.logger.debug(`[auth][local] deserializing user...`)
        ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
        return find_user_by_id_f(id, done, ctx)
      } catch(error) {
        ctx.miolo.logger.error(`[auth][local] Error deserializing user: ${error}`)
        return done(error, null)
      }
    })
  }

  const local_strategy= (ctx) => new LocalStrategy.Strategy (
    (username, password, done) => {
      ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
      return local_auth_user_f(username, password, done, ctx)
  })

  const google_strategy = (ctx) => new GoogleStrategy(
    {
      clientID: google_client_id,
      clientSecret: google_client_secret,
      callbackURL: google_url_callback_f,
      passReqToCallback: true
    },
    (_req, accessToken, refreshToken, profile, done) => {
      ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
      return google_auth_user_f(accessToken, refreshToken, profile, done, ctx)
    }
  )  

  app.use((ctx, next) => {
    passport.serializeUser(serialize_user(ctx))
    passport.deserializeUser(deserialize_user(ctx))
    passport.use(local_strategy(ctx))
    passport.use('google', google_strategy(ctx))
    return next()
  })
  

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
  const handleLocalLogIn = (ctx, next) => {
    ctx.miolo.logger.debug(`[auth][local] handleLocalLogIn() - authenticating...`)
    return passport.authenticate('local', async function(err, user, info, _status) {
      if (user === false) {
        ctx.miolo.logger.debug(`[auth][local] handleLocalLogIn() - user not authenticated`)
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
        ctx.miolo.logger.debug(`[auth][local] handleLocalLogIn() - user authenticated`)
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

        if (local_url_login_redirect!=undefined) {
          ctx.redirect(local_url_login_redirect)
        }
      }
    })(ctx)
  }


  // handle auth routes
  const handleGoogleLogin = passport.authenticate('google', {
    scope: ['profile', 'email']
  })

  const handleGoogleCallback = (ctx, next) => {
    ctx.miolo.logger.debug(`[auth][google] handleGoogleCallback() - authenticating...`)
    return passport.authenticate('google', async function(err, user, info, _status) {
      if (err || (user === false)) {
        ctx.miolo.logger.debug(`[auth][google] handleGoogleCallback() - user not authenticated`)
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

        ctx.redirect(google_url_logout_redirect || '/')

      } else {
        ctx.miolo.logger.debug(`[auth][google] handleGoogleCallback() - user authenticated`)
        await ctx.login(user)
        ctx.session.user = user // ctx.state.user
        ctx.session.authenticated = true
        
        // ctx.body = { 
        //   ok: true,
        //   data: {
        //     user : user,
        //     authenticated: true
        //   }
        // }
        
        ctx.redirect(google_url_login_redirect || '/')
      }
    })(ctx, next)
  }


  const handleLogOut = async (ctx, next) => {
    if (ctx.session.authenticated) {
      ctx.miolo.logger.debug(`[auth][local] handleLogOut() - logging out...`)

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
        
      if (local_url_logout_redirect!=undefined) {
        ctx.redirect(local_url_logout_redirect)
      } else {
        await ctx.logout()
      }  
    } else {
      ctx.miolo.logger.debug(`[auth][local] handleLogOut() - logging out (unauthed)...`)

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
  login_router.post(local_url_login_f,    handleLocalLogIn)
  login_router.get (local_url_logout_f,   handleLogOut)
  login_router.post(local_url_logout_f,   handleLogOut)
  login_router.get(google_url_login_f,    handleGoogleLogin)
  login_router.get(google_url_callback_f, handleGoogleCallback)
  login_router.get(google_url_logout_f,   handleLogOut)
  login_router.post(google_url_logout_f,  handleLogOut)
  
  app.use(login_router.routes()) 

}

export {init_passport_auth_middleware}
