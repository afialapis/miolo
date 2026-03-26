import { db_todo_find } from "#server/db/io/todos/find.mjs"
import { db_todo_read } from "#server/db/io/todos/read.mjs"

export async function r_todo_list(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_todo_list] Reading todo list`)

    const res = await db_todo_read(ctx, params)

    ctx.miolo.logger.info(`[r_todo_list] Read todo list (${res.length})`)
    return { ok: true, data: res }
  } catch (error) {
    ctx.miolo.logger.error(`[r_todo_list] Error reading todo list: ${error}`)
    return { ok: false, error: error?.message }
  }
}

// biome-ignore lint/correctness/noUnusedFunctionParameters: params is not used
export async function r_todo_last(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_todo_last] Reading last todos`)

    const res = await db_todo_read(ctx, { options: { limit: 3 } })

    ctx.miolo.logger.info(`[r_todo_last] Read last todos (${res.length})`)
    return { ok: true, data: res }
  } catch (error) {
    ctx.miolo.logger.error(`[r_todo_last] Error reading last todos: ${error}`)
    return { ok: false, error: error?.message }
  }
}

export async function r_todo_find(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_todo_find] Reading todo for tid ${params?.id}`)

    const todo = await db_todo_find(ctx, { filter: { id: params?.id } })

    ctx.miolo.logger.info(`[r_todo_find] Read todo for tid ${params?.id}`)
    return { ok: todo?.id !== undefined, data: todo }
  } catch (error) {
    ctx.miolo.logger.error(`[r_todo_find] Error reading todo for tid ${params?.id}: ${error}`)
    return { ok: false, error: error?.message }
  }
}
