import {db_find_user_by_id} from '#server/db/io/users/auth.mjs'
        
const get_user_id = (user, done, ctx) => {
  ctx.miolo.logger.debug(`[auth][google] get_user_id() - name ${user?.name} - sessionId ${ctx.sessionId}`)
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

const google_auth_user = (accessToken, refreshToken, profile, done, ctx) => {
  

  try {
    // Extract Google profile info
    const googleId = profile.id
    const email = profile.emails?.[0]?.value
    const name = profile.displayName
    const picture = profile.photos?.[0]?.value

    ctx.miolo.logger.debug(`[auth][google] google_auth_user() - checking credentials for ${email} - sessionId ${ctx.sessionId}`)
    
    ctx.miolo.logger.info(`[auth][google] Authenticating user: ${email}`)
    
    // TODO: Create db_user_find_or_create_from_google function
    // For now, returning a mock user
    const user = {
      id: 1,
      email,
      name,
      google_id: googleId,
      picture
    }
    ctx.miolo.logger.debug('[auth][google] google_auth_user() - User logged in', JSON.stringify(user))
    
    done(null, user)
    
  } catch (error) {
    ctx.miolo.logger.error(`[auth][google] Error authenticating user: ${error}`)
    done(error, null)
  }
}

export default {
  google: {
    get_user_id, 
    find_user_by_id, 
    google_auth_user,
    client_id: process.env.MIOLO_AUTH_GOOGLE_CLIENT_ID,
    client_secret: process.env.MIOLO_AUTH_GOOGLE_CLIENT_SECRET,
    callback_url: process.env.MIOLO_AUTH_GOOGLE_CALLBACK_URL || 'http://googlehost:8001/auth/google/callback',
    url_login: '/auth/google',
    url_callback: '/auth/google/callback',
    url_logout: '/user/logout',
    url_logout_redirect: '/'
  }
}
