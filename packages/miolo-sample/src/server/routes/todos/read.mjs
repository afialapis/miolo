import { 
  db_todo_read,
  db_todo_find
} from "#server/db/io/todos/read.mjs"

export async function r_todo_list(ctx, _params) {
  // const _p = ctx.miolo.parser
  // TODO Use some filtering here, or caching
  
  try {
    ctx.miolo.logger.info(`[r_todo_list] Reading todo list`)

    const res= await db_todo_read(ctx.miolo, {})

    ctx.miolo.logger.info(`[r_todo_list] Read todo list`)
    return { ok: true, data: res}

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_list] Error reading todo list: ${error}`)
    return {ok: false, error: error?.message}
  }  
}


export async function r_todo_find(ctx, params) {
  const _p = ctx.miolo.parser
  
  try {
    const tid = _p.parse_value_int(params.id, true)
    ctx.miolo.logger.info(`[r_todo_find] Reading todo for tid ${tid}`)

    const todo= await db_todo_find(ctx.miolo, tid)

    ctx.miolo.logger.info(`[r_todo_find] Read todo for tid ${tid}`)
    return { ok: todo?.id!==undefined, data: todo}

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_find] Error reading todo for tid ${params?.id}: ${error}`)
    return {ok: false, error: error?.message}
  }  
}

