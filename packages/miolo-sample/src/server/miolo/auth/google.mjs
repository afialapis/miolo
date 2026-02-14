import {db_find_user_by_id} from '#server/db/io/users/auth.mjs'
        
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

const google_auth_user = (accessToken, refreshToken, profile, done, ctx) => {
  // auth=> done(null, user) 
  // noauth=> done(null, false, {message: ''}) 
  // err=> done(error, null)
  
  // TODO: Implement database function to find or create user from Google profile
  // Example implementation:
  
  try {
    // Extract Google profile info
    const googleId = profile.id
    const email = profile.emails?.[0]?.value
    const name = profile.displayName
    const picture = profile.photos?.[0]?.value
    
    ctx.miolo.logger.info(`[auth:google] Authenticating user: ${email}`)
    
    // TODO: Create db_user_find_or_create_from_google function
    // For now, returning a mock user
    const user = {
      id: 1,
      email,
      name,
      google_id: googleId,
      picture
    }
    
    done(null, user)
    
  } catch (error) {
    ctx.miolo.logger.error(`[auth:google] Error authenticating user: ${error}`)
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
    callback_url: process.env.MIOLO_AUTH_GOOGLE_CALLBACK_URL || 'http://localhost:8001/auth/google/callback',
    url_login: '/auth/google',
    url_callback: '/auth/google/callback',
    url_logout: '/user/logout',
    url_logout_redirect: '/'
  }
}
