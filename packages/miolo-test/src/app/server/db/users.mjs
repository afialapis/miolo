export async function users_make_table_from_conn(conn) {
  let query = `
    create table IF NOT EXISTS users (
      id serial,
      username text,
      password text,
      name text,  
      created int DEFAULT EXTRACT (EPOCH FROM NOW())
    )`
  await conn.execute(query)

  query= 'ALTER TABLE users DROP CONSTRAINT IF EXISTS users_id'
  await conn.execute(query)
  query= 'ALTER TABLE users ADD CONSTRAINT users_id UNIQUE (id)'
  await conn.execute(query)
  
  query = "SELECT COUNT(1) AS cc FROM users WHERE username = 'todoer'"
  const res = await conn.execute(query)
  let exists = false
  try {
    exists = res[0]['cc'] > 0
  } catch(_) {}
  if (!exists) {
    query = "INSERT INTO users (username, password, name) VALUES ('todoer', 'todoer', 'The Todoer')"
    await conn.execute(query)
  }

  return true
}

export async function users_make_table(miolo) {
  const conn = await miolo.db.get_connection()
  return users_make_table_from_conn(conn)
}

export async function find_user_by_id(conn, uid) {
  // TODO : handle transactions
  const options= {transaction: undefined}
  const query = `
    SELECT id, username, name, created
      FROM users
     WHERE id = $1`;

  const data= await conn.select(query, [uid], options) 
  try {
    return data[0]
  } catch(e) {
    return undefined
  }
}

export async function auth_user(conn, username, password) {
  // TODO : handle transactions
  const options= {transaction: undefined}

  const query = `
    SELECT id, username, name, created
      FROM users
     WHERE username = $1
       AND password = $2`;

  const data= await conn.select(query, [username, password], options) 
  try {
    return data[0]
  } catch(e) {
    return undefined
  }  
}
