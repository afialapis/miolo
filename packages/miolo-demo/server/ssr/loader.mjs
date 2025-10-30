import { todos_read } from '#server/db/todos.mjs'


const miolo_demo_ssr_loader_make = (authType) => {

  const loader = async (ctx) => {
    //ctx.miolo.logger.info(`[ssr-loader] ...`)
    const todoList= await todos_read(ctx,  {})
    
    const data = {
      authType,
      todoList
    }

    return data
  }

  return loader
}


export {miolo_demo_ssr_loader_make}


