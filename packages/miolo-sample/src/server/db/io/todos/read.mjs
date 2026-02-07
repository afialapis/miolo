import { with_miolo_schema } from 'miolo'
import Joi from 'joi'
import { opt_int, bool_null, opt_str_null } from "#server/lib/util/schema.mjs"
import { make_query_filter } from '#server/db/io/filter.mjs'

/**
 * filter: {
 *    id / todo_id
 *    description
 *    done
 * }
 */
async function _db_todo_read(ctx, filter) {
  ctx.miolo.logger.verbose(`[db_todo_read] Reading todos...`)
  ctx.miolo.logger.silly(`[db_todo_read] filter: ${JSON.stringify(filter)}`)

  const conn= await ctx.miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  let query = `
    SELECT *
      FROM todo AS t
      *WHERE*`

  const [where, values]= make_query_filter(filter, {
    todo_id: {alias: 't.id'},
    description: {op: '~*'},
    done: {coalesce: false, alias: 'COALESCE(done, false)'}
  }, {
    fields: ['id', 'todo_id', 'description', 'done']
  })  

  query = query.replace('*WHERE*', where)  

  // if (values.length == 0){
  //   ctx.miolo.logger.warn(`[prop_detail] Some filter must be specified`)
  //   return []
  // }

  const todos= await conn.select(query, values, options) 
 
  ctx.miolo.logger.verbose(`[db_todo_read] Read ${todos.length} todos`)

  return todos
}





/**
 * filter: {
 *    id / todo_id
 *    description
 *    done
 * }
 */

const todo_read_schema= Joi.object({
  id: opt_int,
  todo_id: opt_int,
  description: opt_str_null,
  done: bool_null,
})

export const db_todo_read = with_miolo_schema(_db_todo_read, todo_read_schema)

