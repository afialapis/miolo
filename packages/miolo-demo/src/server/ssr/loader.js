import { todos_read } from "../db/io/todos"

const loader = async (ctx) => {
  const todoList= await todos_read()
  
  const data = {todoList}

  return data
}


export {loader}


