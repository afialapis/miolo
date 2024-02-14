import { todos_read } from "../db/todos.mjs"

const loader = async (ctx) => {
  const todoList= await todos_read(ctx.miolo,  {})
  
  const data = {todoList}

  return data
}


export {loader}


