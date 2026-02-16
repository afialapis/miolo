import {db_find_user_by_id, 
        db_auth_user} from '#server/db/io/users/auth.mjs'

const get_user_id = (user, done, ctx) => { 
  ctx.miolo.logger.debug(`[auth][local] get_user_id() - name ${user?.name} - sessionId ${ctx.sessionId}`)
  const uid= user?.id
  if (uid!=undefined) {
    return done(null, uid)
  } else {
    const err = new Error('User object is missing an ID for serialization')
    return done(err, null)
  }
}

const find_user_by_id = (id, done, ctx) => {
  ctx.miolo.logger.debug(`[auth][local] find_user_by_id() - Searching user id ${id} - sessionId ${ctx.sessionId}`)
  db_find_user_by_id(ctx.miolo, id).then(user => {
    if (user==undefined) {
      ctx.miolo.logger.debug('[auth][local] find_user_by_id() - User not found')
      const err = new Error('User not found')
      return done(err, null)
    } else {
      ctx.miolo.logger.debug('[auth][local] find_user_by_id() - User found', JSON.stringify(user))
      return done(null, user)
    }
  })
}

const local_auth_user = (username, password, done, ctx) => {
  ctx.miolo.logger.debug(`[auth][local] local_auth_user() - checking credentials for ${username} - sessionId ${ctx.sessionId}`)

  db_auth_user(ctx.miolo, username, password).then( ( [user, msg] ) => {
    if (user==undefined) {
      ctx.miolo.logger.debug(`[auth][local] local_auth_user() - User not logged in: ${msg}`)
      
      const err = new Error(msg)
      //done(null, false, msg)
      return done(err, null)      
    } else {
      ctx.miolo.logger.debug(`[auth][local] local_auth_user() - User logged in! Id: ${user?.id} Email ${user?.email}`)
      return done(null, user)
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
