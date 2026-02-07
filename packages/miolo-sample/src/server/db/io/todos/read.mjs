import { make_query_filter } from '#server/db/io/filter.mjs'

/**
 * filter: {
 *    id / todo_id
 *    description
 *    done
 * }
 */
export async function db_todo_read(miolo, filter) {
  miolo.logger.verbose(`[db_todo_read] Reading todos...`)
  miolo.logger.silly(`[db_todo_read] filter: ${JSON.stringify(filter)}`)

  const conn= await miolo.db.get_connection()
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
  //   miolo.logger.warn(`[prop_detail] Some filter must be specified`)
  //   return []
  // }

  const todos= await conn.select(query, values, options) 
 
  miolo.logger.verbose(`[db_todo_read] Read ${todos.length} todos`)

  return todos
}


export async function db_todo_find(miolo, pid) {
  miolo.logger.verbose(`[db_todo_find] id: ${pid}`)

  const filter = {
    id: pid
  }

  const todos = await db_todo_read(miolo, filter)

  if (todos.length == 0) {
    return null
  } 

  return todos[0]
}

