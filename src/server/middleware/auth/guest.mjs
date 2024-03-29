import jwt from 'jwt-simple'

function _guest_token_make_with_jwt(session, logger) {
  const buid= Math.random().toString()
  let secret = session?.secret
  if (!secret) {
    secret= 'miolo_unsafe_secret'
    logger.error('Guest token made with an unsafe secret string. Please, configure your own through session.secret.')
  }
  
  const payload = {
    admin  : false,
    buid   : buid
  }
  return jwt.encode(payload, secret)
}

function _get_cookie_properties(session) {
  let maxAge = session?.options?.maxAge
  if (isNaN(maxAge)) {
    maxAge= 86400
  }
  let expires = new Date()
  expires.setSeconds(expires.getSeconds() + maxAge)

  return {
    expires,
    httpOnly: false
  }
}


const init_guest_auth_middleware = ( app, options, session ) => {
  const logger= app.context.miolo.logger
  
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

    if (token===undefined || token.length==0) {
      token = await _make_guest_token()
      logger.debug(`Guest token conceeded`)
    }

    const options= _get_cookie_properties(session)
    ctx.cookies.set('token', token, options)

    ctx.session= {
      user: {
        name: 'guest'
      },
      authenticated: true,
      token
    }    
    
    await next()
  }

  app.use(guest_auth_middleware)

}

export {init_guest_auth_middleware}
