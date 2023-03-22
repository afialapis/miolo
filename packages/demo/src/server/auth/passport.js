
import {find_user_by_id as q_find_user_by_id, 
        auth_user as q_auth_user} from '../db/io/users'

// eslint-disable-next-line no-unused-vars
const get_user_id = (user, done, miolo) => { 
  console.log('[miolo-demo][passport] get_user_id()', user)
  const uid= user?.id
  if (uid!=undefined) {
    done(null, uid)
  } else {
    done(false, null)
  }
}

const find_user_by_id = (id, done, miolo) => {
  console.log('[miolo-demo][passport] find_user_by_id()', id)
  const conn= miolo.db.getConnection()

  q_find_user_by_id(conn, id).then(user => {
    if (user==undefined) {
      done('User not found', null)
    } else {
      done(null, user)
    }
  })
}

const local_auth_user = (username, password, done, miolo) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)

  console.log('[miolo-demo][passport] local_auth_user()', username, password)

  const conn= miolo.db.getConnection()
  q_auth_user(conn, username, password).then(user => {
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
