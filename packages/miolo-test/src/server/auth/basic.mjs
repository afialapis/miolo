import { auth_user as q_auth_user } from "../db/users.mjs"

const auth_user = async (username, password, ctx) => {
  const conn = await ctx.miolo.db.get_connection()
  const user = await q_auth_user(conn, username, password)

  return [user, ""]
}

export default {
  auth_user,
  realm: undefined, //'demo.app',
  paths: ["/crud", "/queries"] // ['/api']
}
