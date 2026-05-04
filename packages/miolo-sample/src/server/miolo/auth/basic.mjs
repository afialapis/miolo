import { db_auth_user } from "#server/db/io/users/auth.mjs"

const local_auth_user = async (username, password, ctx) => {
  const [user, msg] = await db_auth_user(ctx.miolo, username, password)

  return [user, msg]
}

export default {
  basic: {
    auth_user: local_auth_user,
    realm: undefined, //'demo.app',
    paths: ["/crud"] // ['/api']
  }
}
