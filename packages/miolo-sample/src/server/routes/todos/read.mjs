import { 
  db_todo_read
} from "#server/db/io/todos/read.mjs"

import { 
  db_todo_find
} from "#server/db/io/todos/find.mjs"

export async function r_todo_list(ctx, params) {
  // const _p = ctx.miolo.parser
  // TODO Use some filtering here, or caching
  
  try {
    ctx.miolo.logger.info(`[r_todo_list] Reading todo list`)

    const res= await db_todo_read(ctx.miolo, params)

    ctx.miolo.logger.info(`[r_todo_list] Read todo list`)
    return { ok: true, data: res}

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_list] Error reading todo list: ${error}`)
    return {ok: false, error: error?.message}
  }  
}


export async function r_todo_find(ctx, params) {
  
  try {
    ctx.miolo.logger.info(`[r_todo_find] Reading todo for tid ${params?.id}`)

    const todo= await db_todo_find(ctx.miolo, params)

    ctx.miolo.logger.info(`[r_todo_find] Read todo for tid ${params?.id}`)
    return { ok: todo?.id!==undefined, data: todo}

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_find] Error reading todo for tid ${params?.id}: ${error}`)
    return {ok: false, error: error?.message}
  }  
}

