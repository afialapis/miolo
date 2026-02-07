import {db_todo_upsave} from './upsave.mjs'
import { with_miolo_schema } from 'miolo'
import Joi from 'joi'
import { opt_int, bool_null } from "#server/lib/util/schema.mjs"
import { db_todo_find } from './find.mjs'

async function _db_todo_toggle(ctx, params) {
  ctx.miolo.logger.verbose(`[db_todo_toggle] Toggling todo with tid ${params?.id }`)

  const todo = await db_todo_find(ctx, params)

  if (todo == null) {
    throw new Error(`[db_todo_toggle] Trying to toggle a todo that does not exist`)
  }

  const done = !todo.done

  const todo_data = {
    id: parseInt(params.id),
    done 
  }

  const nrecs = await db_todo_upsave(ctx, todo_data)
  
  ctx.miolo.logger.verbose(`[db_todo_toggle] Toggled todo with tid ${params?.id} (${nrecs} records updated)`)

  return done
}

const todo_toggle_schema= Joi.object({
  id: opt_int,
  done: bool_null,
})

export const db_todo_toggle = with_miolo_schema(_db_todo_toggle, todo_toggle_schema)
