import jwt from 'jwt-simple'

function _guest_token_make_with_jwt(session, logger) {
  const buid= Math.random().toString()
  let secret = session?.secret
  if (!secret) {
    secret= 'miolo_unsafe_secret'
    logger.error('Guest token made with an unsafe secret string. Please, configure your own through session.secret.')
  }
  let maxAge = session?.options?.maxAge
  if (isNaN(maxAge)) {
    maxAge= 86400
  }
  const payload = {
    admin  : false,
    buid   : buid,
    expires: Date.now() + maxAge
  }
  return jwt.encode(payload, secret)
}


const init_guest_auth_middleware = ( app, options, session, logger ) => {
  
  const _make_guest_token = () => {
    try {
      let {make_guest_token} = options
      if (make_guest_token!=undefined) {
        return make_guest_token(session || {})
      }
    } catch(_) {}

    return _guest_token_make_with_jwt(session || {}, logger)
  }

  async function guest_auth_middleware(ctx, next) {

    // Try to get our token from headers (server) or cookies (client)
    let token= ctx.cookies.get('token') || ctx.headers['token']

    if (token) {
      token = await _make_guest_token()
    }

    ctx.cookies.set('token', token)
    ctx.user = {
      name: 'guest',
      token
    }    
    
    await next()
  }

  app.use(guest_auth_middleware)

}

export {init_guest_auth_middleware}
