/* eslint-disable no-unused-vars*/
import passport from 'koa-passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import Router from '@koa/router'
import { init_session_middleware } from '../local/session/index.mjs'

// google: {
//   get_user_id:     (user, done, ctx) => done(null, user.id), // default
//   find_user_by_id: (id, done, ctx) => done(null, {id: 1}),  // ok=> done(null, user)  err=> done(error, null)
//   google_auth_user: (accessToken, refreshToken, profile, done, ctx) => done(null, {id: 1})
//                    // auth=> done(null, user) noauth=> done(null, false, {message: ''}) err=> done(error, null)
//   client_id: 'your-google-client-id',
//   client_secret: 'your-google-client-secret',
//   url_login : '/auth/google',
//   url_callback : '/auth/google/callback',
//   url_logout: '/logout',
//   url_login_redirect: undefined
//   url_logout_redirect: '/'
// }

/*
1. Cliente → GET /auth/google (handleGoogleLogin)
            ↓
2. Servidor → REDIRECT a Google (automático)
            ↓
3. Usuario autentica en GOOGLE.COM
            ↓
4. Google → REDIRECT a /auth/google/callback (automático)
            ↓
5. Servidor procesa (handleGoogleCallback) → Respuesta
*/

const def_get_user_id = (user, done, ctx) => done(null, user.id)

const def_find_user_by_id = (id, done, ctx) => {
  const err = Error('You need to define auth.google.find_user_by_id')
  done(err, null)
}

const def_google_auth_user = (accessToken, refreshToken, profile, done, ctx) => {
  const err = Error('You need to define auth.google.google_auth_user')
  done(err, null)
}


const init_google_auth_middleware = (app, options, sessionConfig, cacheConfig) => {
  const {get_user_id, find_user_by_id, google_auth_user,
         client_id, client_secret, 
         url_login, url_callback, url_logout, url_login_redirect, url_logout_redirect} = options

  // fallback funcs
  const get_user_id_f = get_user_id || def_get_user_id
  const find_user_by_id_f = find_user_by_id || def_find_user_by_id
  const google_auth_user_f = google_auth_user || def_google_auth_user
  
  const url_login_f = url_login || '/auth/google'
  const url_callback_f = url_callback || '/auth/google/callback'
  const url_logout_f = url_logout || '/logout'
  
  // init passport
  const serialize_user = (ctx) => (user, done) => {
    process.nextTick(function() {
      try {
        ctx.miolo.logger.debug(`[auth][google] serializing user...`)
        ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
        return get_user_id_f(user, done, ctx)
      } catch(error) {
        ctx.miolo.logger.error(`[auth][google] Error serializing user: ${error}`)
        return done(error, null)
      }
    })
  }

  const deserialize_user = (ctx) => (id, done) => {
    process.nextTick(function() {
      try {
        ctx.miolo.logger.debug(`[auth][google] deserializing user...`)
        ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
        return find_user_by_id_f(id, done, ctx)
      } catch(error) {
        ctx.miolo.logger.error(`[auth][google] Error deserializing user: ${error}`)
        return done(error, null)
      }
    })
  }

  const google_strategy = (ctx) => new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: url_callback_f,
      passReqToCallback: true
    },
    (_req, accessToken, refreshToken, profile, done) => {
      ctx.sessionId = ctx.session?.externalKey ? ctx.getSessionStoreKey(ctx.session?.externalKey) : undefined
      return google_auth_user_f(accessToken, refreshToken, profile, done, ctx)
    }
  )

  app.use((ctx, next) => {
    passport.serializeUser(serialize_user(ctx));
    passport.deserializeUser(deserialize_user(ctx));
    passport.use('google', google_strategy(ctx));
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

        ctx.redirect('/')

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

        //if (url_login_redirect!=undefined) {
        //  ctx.redirect(url_login_redirect)
        //}
        ctx.redirect('/')
      }
    })(ctx, next)
  }

  const handleLogOut = async (ctx, next) => {
    if (ctx.session.authenticated) {
      ctx.miolo.logger.debug(`[auth][google] handleLogOut() - logging out...`)
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
      ctx.miolo.logger.debug(`[auth][google] handleLogOut() - logging out (unauthed)...`)
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
  const google_router = new Router()
  google_router.get(url_login_f,    handleGoogleLogin)
  google_router.get(url_callback_f, handleGoogleCallback)
  google_router.get(url_logout_f,   handleLogOut)
  google_router.post(url_logout_f,  handleLogOut)
  
  app.use(google_router.routes()) 
}

export {init_google_auth_middleware}
