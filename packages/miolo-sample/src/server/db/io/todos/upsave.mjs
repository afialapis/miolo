import { with_miolo_schema } from 'miolo'
import Joi from 'joi'
import { opt_int, bool_null, opt_str_null } from "#server/lib/util/schema.mjs"

async function _db_todo_upsave(ctx, params) { 
  ctx.miolo.logger.verbose(`[db_todo_upsave] id: ${params?.id || 'new'}`)

  const conn= await ctx.miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todo = await conn.get_model('todo')

  let tid = params?.id
  if (params?.id != undefined) {
    const nrecs = await Todo.update(params, {id: params.id}, options)
    ctx.miolo.logger.verbose(`[db_todo_upsave] Updated ${nrecs} todos`)
  } else {
    tid= await Todo.insert(params, options)
    ctx.miolo.logger.verbose(`[db_todo_upsave] Inserted todo with id ${tid}`)
  }
  
  return {...params, id: tid}
}

const todo_upsave_schema= Joi.object({
  id: opt_int,
  description: opt_str_null,
  done: bool_null,
})

export const db_todo_upsave = with_miolo_schema(_db_todo_upsave, todo_upsave_schema)
