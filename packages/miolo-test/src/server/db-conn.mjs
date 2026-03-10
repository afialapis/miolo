import { miolo_db_connection_pg, miolo_db_drop_connections } from "miolo"
import { makeConfig } from "./config.mjs"

let conn

export async function test_db_conn_init(options = undefined) {
  conn = await miolo_db_connection_pg(makeConfig(), options)

  return conn
}

export function test_db_conn_get() {
  return conn
}

export async function test_db_conn_drop() {
  await miolo_db_drop_connections()
}
