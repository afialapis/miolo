import { db_todo_read } from "#server/io/db/todos/read.mjs"
import { COMMON_CACHE_NS } from "#server/miolo/cache/ns.mjs"

export async function ch_todo_read(ctx, params) {
  ctx.miolo.logger.verbose(`[cache][todo] Reading todos`)

  const todos = await ctx.miolo.cache.item_get_or_set_json(COMMON_CACHE_NS, `todos`, async () => {
    const filter = {}
    const options = {}
    return await db_todo_read(ctx, { filter, options })
  })

  if (params?.options?.limit) {
    return todos.slice(0, params.options.limit)
  }

  return todos
}

export async function ch_todo_find(ctx, params) {
  ctx.miolo.logger.verbose(`[cache][todo] Finding todo`)

  const todos = await ch_todo_read(ctx)

  return todos.find((todo) => todo.id === params?.filter?.id)
}

export async function ch_todo_invalidate(ctx) {
  ctx.miolo.logger.verbose(`[cache][todo] Invalidating todos cache`)
  await ctx.miolo.cache.item_unset(COMMON_CACHE_NS, `todos`)

  if (!ctx.miolo.io) {
    ctx.miolo.logger.warn(`[cache][todo] IO not available`)
    return
  }

  ctx.miolo.logger.verbose(`[cache][todo] Invalidating connected clients`)
  await ctx.miolo.io.emitSsrRefresh(ctx, "todos")
}
