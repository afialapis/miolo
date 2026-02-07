import { 
  db_todo_read
} from "#server/db/io/todos/read.mjs"

const loader = async (ctx) => {
  let todos= []
  
  try {
    todos = await db_todo_read(ctx, {})
    todos = todos.sort((a, b) => b.created_at - a.created_at)
  } catch(_) {}
    
  const data = {
    todos
  }

  return data
}


export {loader}


