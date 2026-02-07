import {db_todo_read} from './read.mjs'

export async function db_todo_find(ctx, params) {
  ctx.miolo.logger.verbose(`[db_todo_find] id: ${params?.id}`)

  const filter = {
    id: params.id
  }

  const todos = await db_todo_read(ctx, filter)

  if (todos.length == 0) {
    return null
  } 

  return todos[0]
}
