import Joi from "joi"
import { with_miolo_schema } from "miolo"
import { make_query_filter } from "#server/db/io/filter.mjs"
import { bool_null, opt_int, opt_str_null } from "#server/utils/schema.mjs"

/**
 * filter: {
 *    id / todo_id
 *    description
 *    done
 * }
 * options {
 *    limit : optional int
 * }
 */
async function _db_todo_read(ctx, { filter, options }) {
  try {
    ctx.miolo.logger.verbose(
      `[db_todo_read] Reading todos with filter: ${JSON.stringify(filter)} and options ${JSON.stringify(options)}`
    )

    const conn = await ctx.miolo.db.get_connection()

    let query = `
      SELECT *
        FROM todo AS t
        *WHERE*`

    if (options?.limit !== undefined) {
      query += ` LIMIT ${options.limit}`
    }

    const [where, values] = make_query_filter(
      filter,
      {
        todo_id: { alias: "t.id" },
        description: { op: "~*" },
        done: { coalesce: false, alias: "COALESCE(done, false)" }
      },
      {
        fields: ["id", "todo_id", "description", "done"]
      }
    )

    query = query.replace("*WHERE*", where)

    // if (values.length == 0){
    //   ctx.miolo.logger.warn(`[prop_detail] Some filter must be specified`)
    //   return []
    // }

    const todos = await conn.select(query, values)

    ctx.miolo.logger.verbose(`[db_todo_read] Read ${todos.length} todos`)

    return todos
  } catch (error) {
    ctx.miolo.logger.error(`[db_todo_read] Error reading todos: ${error}`)
    return []
  }
}

/**
 * filter: {
 *    id / todo_id
 *    description
 *    done
 * }
 */

const todo_read_schema = Joi.object({
  filter: Joi.object({
    id: opt_int,
    todo_id: opt_int,
    description: opt_str_null,
    done: bool_null
  }),
  options: Joi.object({
    limit: opt_int
  })
})

export const db_todo_read = with_miolo_schema(_db_todo_read, todo_read_schema)
