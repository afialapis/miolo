import { todos_read } from "../db/todos.mjs"


const miolo_demo_ssr_loader_make = (authType) => {

  const loader = async (ctx) => {
    const todoList= await todos_read(ctx.miolo,  {})
    
    const data = {
      authType,
      todoList
    }

    return data
  }

  return loader
}


export {miolo_demo_ssr_loader_make}


