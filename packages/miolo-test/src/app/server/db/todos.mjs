import {intre_now} from 'intre'

export async function todos_make_table_from_conn(conn) {
  let query = `
    create table IF NOT EXISTS todos (
      id serial,
      name text,
      done boolean,
      created int DEFAULT EXTRACT (EPOCH FROM NOW())
    )`
  await conn.execute(query)

  query= 'ALTER TABLE todos DROP CONSTRAINT IF EXISTS todos_id'
  await conn.execute(query)
  query= 'ALTER TABLE todos ADD CONSTRAINT todos_id UNIQUE (id)'
  await conn.execute(query)

  return true
}

export async function todos_make_table(ctx) {
  const conn = await ctx.miolo.db.get_connection()
  return todos_make_table_from_conn(conn)
}

export async function todos_read(miolo, params) {
  const conn = await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await conn.get_model('todos')
  const todos = await Todos.read(options)

  return todos
}

export async function todos_count_last_hour(ctx, params) { 
  const conn = await ctx.miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const h = ctx.miolo.parser.parse_value_int(params?.h, false, 1)

  const one_hour_ago = intre_now() - 60*60*h

  const query = `
    SELECT COUNT(1) as cnt
      FROM todos
     WHERE CREATED >= $1`;

  const data= await conn.select(query, [one_hour_ago], options) 
  const res= data[0]['cnt']

  return {data: res}
}

export async function todos_insert_fake(ctx, params) {
  const conn = await ctx.miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await conn.get_model('todos')

  const d= {
    name: 'Fake todo',
    done: true
  }
  const tid= await Todos.insert(d, options)
  return {id: tid}
}

export async function todos_clean(ctx) {
  const conn= await ctx.miolo.db.get_connection()
  const qry= 'DELETE FROM todos'
  const res= await conn.executeAndCount(qry)

  return res
}
