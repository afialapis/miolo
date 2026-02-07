import { 
  db_todo_save, 
  db_todo_update, 
  db_todo_delete
} from "#server/db/io/todos/upd.mjs"


export async function r_todo_save(ctx, params, strict= true) {
  const _p = ctx.miolo.parser
  
  try {
    ctx.miolo.logger.info(`[r_todo_save] Saving todo info for tid ${params?.id || 'new'} -> ${params?.description}`)

    // Parse todo params
    const is_new = params?.id == undefined
    const description = _p.parse_value_str(params.description, strict)
    const done = _p.parse_value_bool(params.done, strict, false)

    const todo_data = {
      description, 
      done
    }
    
    // Save or update todo
    let tid

    if (is_new) {
      tid = await db_todo_save(ctx.miolo, todo_data)
      if (! tid) {
        throw new Error(`Failed to save todo (invalid tid)`)
      }
    } else {
      tid = _p.parse_value_int(params.id)
      const res = await db_todo_update(ctx.miolo, tid, todo_data)
      if (res !== 1) {
        throw new Error(`Failed to update todo (not found for tid ${tid})`)
      }      
    }

    ctx.miolo.logger.info(`[r_todo_save] Saved todo info for tid ${params?.id || 'new'}`)
    return { ok: true, data: {tid}} 

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_save] Error saving todo info for tid ${params?.id || 'new'}: ${error}`)
    return {ok: false, error: error?.message}
  }

}

export async function r_todo_update(ctx, params) {
  return await r_todo_save(ctx, params, /*strict=*/ false)
}


export async function r_todo_delete(ctx, params) {
  const _p = ctx.miolo.parser
  
  try {
    ctx.miolo.logger.info(`[r_todo_delete] Deleting todo info for tid ${params?.id}`)

    const tid = _p.parse_value_int(params.id)
    const res= await db_todo_delete(ctx.miolo, tid)

    ctx.miolo.logger.info(`[r_todo_delete] Deleted todo for tid ${params.id}`)
    return { ok: true, data: res }

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_delete] Error deleting todo for tid ${params?.id}: ${error}`)
    return {ok: false, error: error?.message}
  }
}




export async function r_todo_toggle_done(ctx, params) {
  const _p = ctx.miolo.parser
  
  try {
    ctx.miolo.logger.info(`[r_todo_toggle_done] Saving toggling todo for tid ${params?.id }`)

    // Parse todo params
    const tid = _p.parse_value_int(params.id, true)
    const done = _p.parse_value_bool(params.done, true)

    const todo_data = {
      id: tid, done
    }

    const res = await db_todo_update(ctx.miolo, tid, todo_data)
    
    ctx.miolo.logger.info(`[r_todo_toggle_done] Toggled todo for tid ${params?.id}`)

    if (res !== 1) {
      return {ok: false, error: 'Failed to update todo'}
    } else {
      return {ok: true, data: {tid}}
    }
  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_toggle_done] Error toggling todo for tid ${params?.id}: ${error}`)
    return {ok: false, error: error?.message}
  }
}
