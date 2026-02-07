


export async function db_user_save(miolo, data) {
  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const uid= data.id
  const User = await conn.get_model('u_user')
  
  let nuid= uid
  if (uid==undefined) {
    nuid = await User.insert(data, options)
  } else {
    data['email'] = data.username
    await User.update(data, {'id': uid}, options)
  }
  return nuid
}
