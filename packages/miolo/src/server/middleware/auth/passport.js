const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;

const Router = require('@koa/router')

// passport: {
//   get_user_id:     (user, done) => done(null, user.id), // default
//   find_user_by_id: (id, done) => done(null, {id: 1}),  // ok=> done(null, user)  err=> done(error, null)
//   local_auth_user: (username, password, done) => done(null, {id: 1})
//                    // auth=> done(null, user) noauth=> done(null, false, {message: ''}) err=> done(error, null)
// }

const def_get_user_id = (user, done) => done(null, user.id)

const def_find_user_by_id = (id, done) => {
  const err = Error('You need to define auth.passport.find_user_by_id')
  done(err, null)
}

const def_local_auth_user = (username, password, done) => {
  const err = Error('You need to define auth.passport.local_auth_user')
  done(err, null)
}


const init_passport_auth_middleware = ( app, options ) => {
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
  const serialize_user = (user, done) => {
    process.nextTick(function() {
      get_user_id_f(user, done)
    })
  }

  const deserialize_user = (id, done) => {
    process.nextTick(function() {
      find_user_by_id_f(id, done)
    })
  }

  const local_strategy= new LocalStrategy(
    (username, password, done) => {
      local_auth_user_f(username, password, done)
  })
  
  passport.serializeUser(serialize_user)
  passport.deserializeUser(deserialize_user)
  passport.use(local_strategy)

  app.use(passport.initialize())
  app.use(passport.session())
  

  // handle auth routes
  const handleLogIn = (ctx, next) => {
    return passport.authenticate('local', function(err, user, info, status) {
      if (user === false) {
        ctx.body = { 
          success: false,
          user: undefined,
          authenticated: false,
          info: info,
          error: err
        }
        ctx.throw(401)
      } else {
        ctx.body = { 
          success: true ,
          user : user,
          authenticated: true
        }
        if (url_login_redirect!=undefined) {
          ctx.redirect(url_login_redirect)
        }

        return ctx.login(user)
      }
    })(ctx)
  }

  const handleLogOut = async (ctx) => {
    if (ctx.isAuthenticated()) {
      ctx.logout()
      ctx.body = { 
        success: true 
      }      
      if (url_logout_redirect!=undefined) {
        ctx.redirect(url_logout_redirect)
      }
    } else {
      ctx.body = { 
        success: false 
      }
      ctx.throw(401)
    }
  }
  
  // Init the router
  const login_router = new Router()
  login_router.post(url_login_f,  handleLogIn)
  login_router.get (url_logout_f, handleLogOut)
  login_router.post(url_logout_f, handleLogOut)
  
  app.use(login_router.routes())
}

export {init_passport_auth_middleware}
