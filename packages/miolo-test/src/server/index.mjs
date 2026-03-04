import { todos_make_table_from_conn } from "./db/todos.mjs"
import { users_make_table_from_conn } from "./db/users.mjs"
import test_server from "./server.mjs"

let app
let conn

export async function test_miolo_app_start(authMode) {
  app = await test_server(authMode)

  conn = await app.context.miolo.db.get_connection("postgres", {
    reset: true
  })
  await users_make_table_from_conn(conn)
  await todos_make_table_from_conn(conn)

  return app
}

export async function test_miolo_app_get() {
  return app
}

export async function test_miolo_conn_get() {
  return conn
}

export async function test_miolo_app_stop() {
  //app.context.miolo.logger.info(`[miolo-test-app] Let's stop the server...`)
  await app.stop()
}
