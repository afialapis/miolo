
import {find_user_by_id as q_find_user_by_id, 
        auth_user as q_auth_user} from '#server/db/users.mjs'

const get_user_id = (user, done, ctx) => { 
  ctx.miolo.logger.debug(`[miolo-test-app][credentials] get_user_id() - name ${user?.name} - sessionId ${ctx.sessionId}`)
  const uid= user?.id
  if (uid!=undefined) {
    return done(null, uid)
  } else {
    const err = new Error('User object is missing an ID for serialization')
    return done(err, null)
  }
}

const find_user_by_id = (id, done, ctx) => {
  ctx.miolo.logger.debug(`[miolo-test-app][credentials] find_user_by_id() - id ${id} - sessionId ${ctx.sessionId}`)
  ctx.miolo.db.get_connection().then((conn) => {
    return q_find_user_by_id(conn, id).then(user => {
      ctx.miolo.logger.debug('[miolo-test-app][credentials] find_user_by_id()', JSON.stringify(user))

      if (user==undefined) {
        const err = new Error('User not found')
        return done(err, null)
      } else {
        return done(null, user)
      }
    })
  })
}

const local_auth_user = (username, password, done, ctx) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)

  ctx.miolo.logger.debug(`[miolo-test-app][credentials] local_auth_user() - checking credentials for ${username} - sessionId ${ctx.sessionId}`)

  ctx.miolo.db.get_connection().then((conn) => {
    q_auth_user(conn, username, password).then(user => {
      ctx.miolo.logger.debug('[miolo-test-app][credentials] local_auth_user() - User logged in', JSON.stringify(user))
  
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
