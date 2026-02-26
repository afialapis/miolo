import { miolo_client } from "miolo-cli"
import { todos_make_table_from_conn } from "../server/db/todos.mjs"
import { users_make_table_from_conn } from "../server/db/users.mjs"
import test_server from "../server/index.mjs"

let app
let fetcher

export function test_cli_init() {
  const miolo_cli = miolo_client({
    config: {
      hostname: "localhost",
      port: 8001,
      force_hostname: true
    }
  })
  fetcher = miolo_cli.fetcher
  return fetcher
}

export async function test_app_start(authMode) {
  app = await test_server(authMode)

  const conn = await app.context.miolo.db.get_connection()
  await users_make_table_from_conn(conn)
  await todos_make_table_from_conn(conn)

  return app
}

export async function test_app_stop() {
  app.context.miolo.logger.info(`[miolo-test-app] Let's stop the server...`)
  await app.stop()
}
