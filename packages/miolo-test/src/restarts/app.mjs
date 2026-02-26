import test_server from "./server/index.mjs"

const dbType = "postgres"

let app
let conn

export async function test_miolo_server_init() {
  app = await test_server()
  await app.start()
  conn = await app.context.miolo.db.get_connection(dbType, {
    reset: true
  })
}

export async function test_miolo_server_stop() {
  await app.stop()
}

export async function test_miolo_get_app() {
  return app
}

export async function test_miolo_get_conn() {
  return conn
}
