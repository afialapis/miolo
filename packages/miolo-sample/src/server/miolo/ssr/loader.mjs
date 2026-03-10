import { db_todo_read } from "#server/db/io/todos/read.mjs"

const loader = async (ctx) => {
  let lastTodos = []

  try {
    lastTodos = await db_todo_read(ctx, { options: { limit: 3 } })
    lastTodos = lastTodos.sort((a, b) => b.created_at - a.created_at)
  } catch (_) {}

  const data = {
    lastTodos
  }

  return data
}

export { loader }
