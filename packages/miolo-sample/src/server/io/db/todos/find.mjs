import { db_todo_read } from "./read.mjs"

export async function db_todo_find(ctx, params) {
  ctx.miolo.logger.verbose(`[db_todo_find] id: ${params?.filter?.id}`)

  const todos = await db_todo_read(ctx, params)

  if (todos.length === 0) {
    return null
  }

  return todos[0]
}
