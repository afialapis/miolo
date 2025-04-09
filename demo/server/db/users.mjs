async function find_user_by_id(conn, uid) {
  // TODO : handle transactions
  const options= {transaction: undefined}
  const query = `
    SELECT id, username, name, created
      FROM users
     WHERE id = $1`
  
  const data= await conn.select(query, [uid], options) 
  try {
    return data[0]
  } catch(e) {
    return undefined
  }
}

async function auth_user(conn, username, password) {
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

export {find_user_by_id, auth_user}
