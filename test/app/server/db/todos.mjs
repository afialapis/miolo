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

export async function todos_make_table(miolo) {
  const conn = await miolo.db.getConnection()
  return todos_make_table_from_conn(conn)
}

export async function todos_read(miolo, params) {
  const conn = await miolo.db.getConnection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await conn.getModel('todos')
  const todos = await Todos.read(options)

  return todos
}


export async function todos_count_last_hour(miolo, params) { 
  const conn = await miolo.db.getConnection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const h = miolo.parser.parse_value_int(params?.h, false, 1)

  const one_hour_ago = intre_now() - 60*60*h

  const query = `
    SELECT COUNT(1) as cnt
      FROM todos
     WHERE CREATED >= $1`;

  const data= await conn.select(query, [one_hour_ago], options) 
  const res= data[0]['cnt']

  return res
}

export async function todos_insert_fake(miolo, params) {
  const conn = await miolo.db.getConnection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await conn.getModel('todos')

  const d= {
    name: 'Fake todo',
    done: true
  }
  const tid= await Todos.insert(d, options)

  return tid
}
