import { todos_read } from "../db/io/todos"

const loader = async (ctx) => {
  const conn= ctx.db.getConnection()
  const todoList= await todos_read(conn)
  
  const data = {todoList}

  return data
}


export {loader}


