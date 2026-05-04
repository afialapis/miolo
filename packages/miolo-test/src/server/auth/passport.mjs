import { auth_user as q_auth_user, find_user_by_id as q_find_user_by_id } from "../db/users.mjs"

const get_user_id = async (user, _ctx) => {
  return user?.id
}

const find_user_by_id = async (id, ctx) => {
  const conn = await ctx.miolo.db.get_connection()
  const user = await q_find_user_by_id(conn, id)
  return user
}

const local_auth_user = async (username, password, ctx) => {
  const conn = await ctx.miolo.db.get_connection()
  const user = await q_auth_user(conn, username, password)
  return [user, ""]
}

export default {
  get_user_id,
  find_user_by_id,
  local_auth_user,
  local_url_login: "/login",
  local_url_logout: "/logout",
  local_url_login_redirect: undefined,
  local_url_logout_redirect: undefined
}
