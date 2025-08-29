
import {find_user_by_id as q_find_user_by_id, 
        auth_user as q_auth_user} from '#server/db/users.mjs'

// eslint-disable-next-line no-unused-vars
const get_user_id = (user, done, miolo) => { 
  //console.log('[miolo-test-app][credentials] get_user_id()', user)
  const uid= user?.id
  if (uid!=undefined) {
    done(null, uid)
  } else {
    done(false, null)
  }
}

const find_user_by_id = (id, done, miolo) => {
  // console.log('[miolo-test-app][credentials] find_user_by_id()', id)
  miolo.db.get_connection().then((conn) => {
    q_find_user_by_id(conn, id).then(user => {
      // console.log('[miolo-test-app][credentials] find_user_by_id()', JSON.stringify(user))

      if (user==undefined) {
        done('User not found', null)
      } else {
        done(null, user)
      }
    })
  })
}

const local_auth_user = (username, password, done, miolo) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)

  // console.log('[miolo-test-app][credentials] local_auth_user() - checking credentials for ', username)

  miolo.db.get_connection().then((conn) => {
    q_auth_user(conn, username, password).then(user => {
      // console.log('[miolo-test-app][credentials] local_auth_user() - User logged in', JSON.stringify(user))
  
      if (user==undefined) {
        done(null, false, 'Invalid credentials')
      } else {
        done(null, user)
      }    
    })
  })

}

export default {
  get_user_id, 
  find_user_by_id, 
  local_auth_user,
  url_login : '/login',
  url_logout: '/logout',
  url_login_redirect : undefined,
  url_logout_redirect: '/'
}
