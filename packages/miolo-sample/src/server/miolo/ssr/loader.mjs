import { 
  db_todo_read
} from "#server/db/io/todos/read.mjs"

const loader = async (ctx) => {
  let todos= []
  
  try {
    todos = await db_todo_read(ctx.miolo, {})
  } catch(_) {}
    
  const data = {
    todos
  }

  return data
}


export {loader}


