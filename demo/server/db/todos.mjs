import {intre_now} from 'intre'

async function todos_read(miolo, params) {
  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  miolo.logger.debug(`[todos_read] Reading todos...`, {section: 'todos-read'})

  const Todos = await conn.get_model('todos')
  const todos = await Todos.read(options)

  miolo.logger.debug(`[todos_read] Read ${todos.length} todos!`, {section: 'todos-read'})

  return todos
}


async function todos_count_last_hours(miolo, params) { 
  miolo.logger.info(`[todos] Counting last ${params.hours} hours todos... `, {section: 'todos-hour'})

  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const one_hour_ago = intre_now() - 60*60 * parseInt(params.hours)

  const query = `
    SELECT COUNT(1) as cnt
      FROM todos
     WHERE CREATED >= $1`;

  const data= await conn.select(query, [one_hour_ago], options) 
  const res= data[0]['cnt']

  miolo.logger.info(`[todos] Counted last ${params.hours} hours todos: ${res} `, {section: 'todos-hour'})

  return res
}

async function todos_insert_fake(miolo, params) {
  const conn= await miolo.db.get_connection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await conn.get_model('todos')

  const d= {
    name: 'Fake todo',
    done: true
  }
  const tid= await Todos.insert(d, options)

  return tid
}



export {todos_read, todos_count_last_hours, todos_insert_fake}