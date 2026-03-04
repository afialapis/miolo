import {
  db_auth_user,
  db_find_user_by_id,
  db_user_find_or_create_from_google
} from "#server/db/io/users/auth.mjs"

const get_user_id = (user, done, ctx) => {
  ctx.miolo.logger.debug(
    `[auth][local] get_user_id() - name ${user?.name} - sessionId ${ctx.sessionId}`
  )
  const uid = user?.id
  if (uid !== undefined) {
    return done(undefined, uid)
  } else {
    const err = new Error("User object is missing an ID for serialization")
    return done(err, undefined)
  }
}

const find_user_by_id = (id, done, ctx) => {
  ctx.miolo.logger.debug(
    `[auth][local] find_user_by_id() - Searching user id ${id} - sessionId ${ctx.sessionId}`
  )
  db_find_user_by_id(ctx.miolo, id).then((user) => {
    if (user === undefined || user === null) {
      ctx.miolo.logger.debug("[auth][local] find_user_by_id() - User not found")
      const err = new Error("User not found")
      return done(err, undefined)
    } else {
      ctx.miolo.logger.debug("[auth][local] find_user_by_id() - User found", JSON.stringify(user))
      return done(undefined, user)
    }
  })
}

const local_auth_user = (username, password, done, ctx) => {
  ctx.miolo.logger.debug(
    `[auth][local] local_auth_user() - checking credentials for ${username} - sessionId ${ctx.sessionId}`
  )

  db_auth_user(ctx.miolo, username, password).then(([user, msg]) => {
    if (user === undefined || user === null) {
      ctx.miolo.logger.debug(`[auth][local] local_auth_user() - User not logged in: ${msg}`)

      const err = new Error(msg)
      return done(err, undefined)
    } else {
      ctx.miolo.logger.debug(
        `[auth][local] local_auth_user() - User logged in! Id: ${user?.id} Email ${user?.email}`
      )
      return done(undefined, user)
    }
  })
}

const google_auth_user = async (_accessToken, _refreshToken, profile, done, ctx) => {
  try {
    // Extract Google profile info
    const google_id = profile.id
    const email = profile.emails?.[0]?.value
    const name = profile.displayName
    const google_picture = profile.photos?.[0]?.value

    ctx.miolo.logger.info(`[auth][google] Authenticated user: ${email}`)
    ctx.miolo.logger.debug(
      `[auth][google] google_auth_user() - upsaving db user for ${email} - sessionId ${ctx.sessionId}`
    )

    return db_user_find_or_create_from_google(
      ctx.miolo,
      email,
      name,
      google_id,
      google_picture
    ).then(([user, msg]) => {
      if (user === undefined || user === null) {
        ctx.miolo.logger.debug(`[auth][google] google_auth_user() - Db user not found: ${msg}`)
        const err = new Error(msg)
        return done(err, undefined)
      } else {
        ctx.miolo.logger.debug(
          `[auth][google] google_auth_user() - Db user found! Id: ${user?.id} Email ${user?.email}`
        )
        return done(undefined, user)
      }
    })
  } catch (error) {
    ctx.miolo.logger.error(`[auth][google] Error preparing db user: ${error}`)
    return done(error, undefined)
  }
}

export default {
  get_user_id,
  find_user_by_id,
  local_auth_user,
  local_url_login: "/login",
  local_url_logout: "/logout",
  local_url_login_redirect: undefined,
  local_url_logout_redirect: "/",
  google_auth_user,
  google_client_id: process.env.MIOLO_AUTH_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.MIOLO_AUTH_GOOGLE_CLIENT_SECRET,
  google_url_login: "/auth/google",
  google_url_callback: process.env.MIOLO_AUTH_GOOGLE_CALLBACK_URL || "/auth/google/callback",
  google_url_logout: "/logout",
  google_url_logout_redirect: "/"
}
