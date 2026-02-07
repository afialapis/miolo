import { db_todo_find} from './read.mjs'

export async function db_todo_save(miolo, data) {  
  miolo.logger.silly(`[db_todo_save] data: ${JSON.stringify(data)}`)


  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todo = await conn.get_model('todo')

  if (data?.id != undefined) {
   throw new Error(`[db_todo_save] Trying to save a todo already with Id (${data.id})`) 
  }
  
  try {
    const tid= await Todo.insert(data, options)
    return tid
  } catch (error) {
    throw new Error(`[db_todo_save] Error saving todo: ${error}`)
  }
}

export async function db_todo_update(miolo, tid, data) {  
  miolo.logger.silly(`[db_todo_update] data: ${JSON.stringify(data)}`)

  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todo = await conn.get_model('todo')

  if (tid == undefined) {
    throw new Error(`[db_todo_update] Trying to update a todo without Id`)
  }

  const todo = await db_todo_find(miolo, tid)

  if (todo == null) {
    throw new Error(`[db_todo_update] Trying to update a todo that does not exist`)
  }

  const res = await Todo.update(data, {'id': tid}, options)
  return res
}

export async function db_todo_delete(miolo, tid) {
  miolo.logger.verbose(`[db_todo_delete] tid: ${tid}`)

  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todo = await conn.get_model('todo')

  const todo = await db_todo_find(miolo, tid)

  if (todo == null) {
    throw new Error(`[db_todo_delete] Trying to delete a todo that does not exist`)
  }

  await Todo.delete({'id': tid}, options)
  return tid
}
