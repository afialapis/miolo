import { intre_now, intre_to_str } from "intre"
import { blue } from "tinguir"
import { ch_todo_invalidate } from "#server/io/cache/todos.mjs"
import { db_todo_upsave } from "#server/io/db/todos/upsave.mjs"

export const autoTodosInsert = async (miolo) => {
  miolo.logger.info(`${blue("[cron][auto-todos]")} Inserting auto todo...`)

  // broadcast an event to all clients
  //miolo.io.emit("ssr-invalidate", { name: "todos" })

  const ctx = { miolo }

  await db_todo_upsave(ctx, {
    description: `${intre_to_str(intre_now(), "DD/MM/YYYY HH:mm:ss")} - auto todo`,
    done: false
  })

  await ch_todo_invalidate({ miolo })
  //
  // miolo.io.emit("ssr-refresh", { name: "todos" })

  miolo.logger.info(`${blue("[cron][auto-todos]")} Done!`)
}
