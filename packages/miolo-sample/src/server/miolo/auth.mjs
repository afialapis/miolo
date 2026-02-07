import {db_find_user_by_id, 
        db_auth_user} from '#server/db/io/users/auth.mjs'
        
const get_user_id = (user, done, _ctx) => {
  const uid= user?.id
  if (uid!=undefined) {
    done(null, uid)
  } else {
    done(false, null)
  }
}

const find_user_by_id = (id, done, ctx) => {
  db_find_user_by_id(ctx.miolo, id).then(user => {
    if (user==undefined) {
      done('User not found', null)
    } else {
      done(null, user)
    }
  })
}

const local_auth_user = (username, password, done, ctx) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)
  db_auth_user(ctx.miolo, username, password).then( ( [user, msg] ) => {
    if (user==undefined) {
      done(null, false, msg)
    } else {
      done(null, user)
    }

  })
}

export default {
  get_user_id, 
  find_user_by_id, 
  local_auth_user,
  url_login : '/user/login',
  url_logout: '/user/logout',
  url_login_redirect: undefined,
  url_logout_redirect: '/'
}
