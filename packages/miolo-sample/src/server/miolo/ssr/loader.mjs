import { ch_todo_read } from "#server/io/cache/todos.mjs"

const loader = async (ctx) => {
  let lastTodos = []

  try {
    lastTodos = await ch_todo_read(ctx, { options: { limit: 3 } })
    lastTodos = lastTodos.sort((a, b) => b.created_at - a.created_at)
  } catch (_) {}

  const data = {
    lastTodos
  }

  return data
}

export { loader }
