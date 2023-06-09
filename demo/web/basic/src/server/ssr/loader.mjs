import { todos_read } from "../../../../../commons/server/db/io/todos.mjs"

const loader = async (ctx) => {
  const conn= ctx.miolo.db.getConnection()
  const todoList= await todos_read(conn)
  
  const data = {todoList}

  return data
}


export {loader}


