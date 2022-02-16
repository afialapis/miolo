import {find_user_by_id as q_find_user_by_id, 
        auth_user as q_auth_user} from 'server/db/io/users'

const get_user_id = (user, done) => {
  console.log('[miolo-demo][passport] get_user_id()', user)
  const uid= user?.id
  if (uid!=undefined) {
    done(null, uid)
  } else {
    done(false, null)
  }
}

const find_user_by_id = (id, done) => {
  console.log('[miolo-demo][passport] find_user_by_id()', id)
  q_find_user_by_id(id).then(user => {
    if (user==undefined) {
      done('User not found', null)
    } else {
      done(null, user)
    }
  })
}

const local_auth_user = (username, password, done) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)

  console.log('[miolo-demo][passport] local_auth_user()', username, password)
  q_auth_user(username, password).then(user => {
    if (user==undefined) {
      done(null, false, 'Invalid credentials')
    } else {
      done(null, user)
    }    
  })
}

module.exports= {
  get_user_id, 
  find_user_by_id, 
  local_auth_user,
  url_login : '/login',
  url_logout: '/logout',
  url_login_redirect : undefined,
  url_logout_redirect: '/'
}
