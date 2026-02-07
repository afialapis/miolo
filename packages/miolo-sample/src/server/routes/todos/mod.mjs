import { 
  db_todo_upsave
} from "#server/db/io/todos/upsave.mjs"
import { 
  db_todo_delete
} from "#server/db/io/todos/delete.mjs"
import { 
  db_todo_toggle
} from "#server/db/io/todos/toggle.mjs"


export async function r_todo_upsave(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_todo_upsave] Upsaving todo info for tid ${params?.id || 'new'} -> ${params?.description}`)

    const res= await db_todo_upsave(ctx, params)

    ctx.miolo.logger.info(`[r_todo_upsave] Upsaved todo info for tid ${params?.id || 'new'}`)
    return { ok: true, data: res} 

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_upsave] Error upsaving todo info for tid ${params?.id || 'new'}: ${error}`)
    return {ok: false, error: error?.message}
  }

}

export async function r_todo_delete(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_todo_delete] Deleting todo info for tid ${params?.id}`)

    const res= await db_todo_delete(ctx, params)

    ctx.miolo.logger.info(`[r_todo_delete] Deleted todo for tid ${params.id}`)
    return { ok: true, data: res }

  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_delete] Error deleting todo for tid ${params?.id}: ${error}`)
    return {ok: false, error: error?.message}
  }
}


export async function r_todo_toggle_done(ctx, params) {
  try {
    ctx.miolo.logger.info(`[r_todo_toggle_done] Toggling todo with id ${params?.id }`)

    const done = await db_todo_toggle(ctx, params)
    
    ctx.miolo.logger.info(`[r_todo_toggle_done] Toggled todo with tid ${params?.id}`)

    return {ok: true, data: {done}}
  } catch(error) {
    ctx.miolo.logger.error(`[r_todo_toggle_done] Error toggling todo with tid ${params?.id}: ${error}`)
    return {ok: false, error: error?.message}
  }
}
