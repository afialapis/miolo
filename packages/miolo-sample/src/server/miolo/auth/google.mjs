import {
  db_find_user_by_id,
  db_user_find_or_create_from_google
} from '#server/db/io/users/auth.mjs'
        
const get_user_id = (user, done, ctx) => {
  ctx.miolo.logger.debug(`[auth][google] get_user_id() - name ${user?.name} - sessionId ${ctx.sessionId}`)
  console.log(JSON.stringify(user))
  const uid= user?.id
  if (uid!=undefined) {
    return done(null, uid)
  } else {
    const err = new Error('User object is missing an ID for serialization')
    return done(err, null)
  }
}

const find_user_by_id = (id, done, ctx) => {
  ctx.miolo.logger.debug(`[auth][google] find_user_by_id() - id ${id} - sessionId ${ctx.sessionId}`)
  db_find_user_by_id(ctx.miolo, id).then(user => {
      ctx.miolo.logger.debug('[auth][google] find_user_by_id()', JSON.stringify(user))
    if (user==undefined) {
      const err = new Error('User not found')
      return done(err, null)
    } else {
      return done(null, user)
    }
  })
}

const google_auth_user = async (accessToken, refreshToken, profile, done, ctx) => {
  try {
    // Extract Google profile info
    const google_id = profile.id
    const email = profile.emails?.[0]?.value
    const name = profile.displayName
    const google_picture = profile.photos?.[0]?.value

    ctx.miolo.logger.info(`[auth][google] Authenticated user: ${email}`)
    ctx.miolo.logger.debug(`[auth][google] google_auth_user() - upsaving db user for ${email} - sessionId ${ctx.sessionId}`)

    return db_user_find_or_create_from_google(ctx.miolo, email, name, google_id, google_picture).then(([user, msg]) => {
      
      if (user==undefined) {
        ctx.miolo.logger.debug(`[auth][google] google_auth_user() - Db user not found: ${msg}`)
        const err = new Error(msg)
        //done(null, false, msg)
        return done(err, null)
      } else {
        ctx.miolo.logger.debug(`[auth][google] google_auth_user() - Db user found! Id: ${user?.id} Email ${user?.email}`)
        return done(null, user)
      }      
    })
    
  } catch (error) {
    ctx.miolo.logger.error(`[auth][google] Error preparing db user: ${error}`)
    return done(error, null)
  }
}

export default {
  get_user_id, 
  find_user_by_id, 
  google_auth_user,
  client_id: process.env.MIOLO_AUTH_GOOGLE_CLIENT_ID,
  client_secret: process.env.MIOLO_AUTH_GOOGLE_CLIENT_SECRET,
  callback_url: process.env.MIOLO_AUTH_GOOGLE_CALLBACK_URL || 'http://googlehost:8001/auth/google/callback',
  url_login: '/auth/google',
  url_callback: '/auth/google/callback',
  url_logout: '/logout',
  url_logout_redirect: '/'
}
