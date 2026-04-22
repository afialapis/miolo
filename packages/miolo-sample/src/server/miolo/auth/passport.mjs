import {
  db_auth_user,
  db_find_user_by_id,
  db_user_find_or_create_from_google
} from "#server/db/io/users/auth.mjs"

const get_user_id = async (user, ctx) => {
  ctx.miolo.logger.debug(
    `[auth][local] get_user_id() - name ${user?.name} - sessionId ${ctx.sessionId}`
  )
  return user?.id
}

const find_user_by_id = async (id, ctx) => {
  ctx.miolo.logger.debug(
    `[auth][local] find_user_by_id() - Searching user id ${id} - sessionId ${ctx.sessionId}`
  )
  const user = await db_find_user_by_id(ctx.miolo, id)
  return user
}

const local_auth_user = async (username, password, ctx) => {
  ctx.miolo.logger.debug(
    `[auth][local] local_auth_user() - checking credentials for ${username} - sessionId ${ctx.sessionId}`
  )

  const [user, msg] = await db_auth_user(ctx.miolo, username, password)
  return [user, msg]
}

const google_auth_user = async (_accessToken, _refreshToken, profile, ctx) => {
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

    const [user, msg] = await db_user_find_or_create_from_google(
      ctx.miolo,
      email,
      name,
      google_id,
      google_picture
    )
    return [user, msg]
  } catch (error) {
    ctx.miolo.logger.error(`[auth][google] Error preparing db user: ${error}`)
    return [undefined, error]
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
