import { with_miolo_schema } from 'miolo'
import Joi from 'joi'
import { opt_int } from "#server/lib/util/schema.mjs"
import { db_todo_find} from './find.mjs'

async function _db_todo_delete(ctx, params) {
  ctx.miolo.logger.verbose(`[db_todo_delete] id: ${params?.id}`)

  const conn= await ctx.miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todo = await conn.get_model('todo')

  const todo = await db_todo_find(ctx, params.id)

  if (todo == null) {
    throw new Error(`[db_todo_delete] Trying to delete a todo that does not exist`)
  }

  await Todo.delete({'id': params.id}, options)
  return params.id
}

const todo_delete_schema= Joi.object({
  id: opt_int,
})

export const db_todo_delete = with_miolo_schema(_db_todo_delete, todo_delete_schema)