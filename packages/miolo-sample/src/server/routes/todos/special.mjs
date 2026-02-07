import {intre_now} from 'intre'

export async function r_todo_count_last_hours(ctx, params) { 
  ctx.miolo.logger.verbose(`[r_todo_count_last_hours] Counting last ${params.hours} hours todos... `)

  const conn= await ctx.miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const one_hour_ago = intre_now() - 60*60 * parseInt(params.hours)

  const query = `
    SELECT COUNT(1) as cnt
      FROM todo
     WHERE created_at >= $1`;

  const data= await conn.select(query, [one_hour_ago], options) 
  const res= data[0]['cnt']

  ctx.miolo.logger.verbose(`[r_todo_count_last_hours] Counted last ${params.hours} hours todos: ${res} `)

  return {ok: true, data: {count: res}}
}

export async function r_todo_insert_fake(ctx, params) {
  ctx.miolo.logger.verbose(`[r_todo_insert_fake] Inserting fake todo... `)

  const conn= await ctx.miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await conn.get_model('todo')

  const d= {
    description: 'Fake todo',
    done: params?.done===true
  }
  const tid= await Todos.insert(d, options)

  ctx.miolo.logger.verbose(`[r_todo_insert_fake] Inserted fake todo with id ${tid}`)

  return {ok: true, data: {id: tid}}
}