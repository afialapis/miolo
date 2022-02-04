import { todos_read } from "../db/io/todos"

const ssr_data_for_location = async (location, user, authenticated) => {
  const todoList= await todos_read()
  
  const data = {todoList}

  return data
}


export {ssr_data_for_location}


