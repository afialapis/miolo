import {intre_now} from 'intre'

async function todos_read(miolo, params) {
  const conn= miolo.db.getConnection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = conn.getModel('todos')
  const todos = await Todos.read(options)

  return todos
}


async function todos_count_last_hour(miolo, params) { 
  const conn= miolo.db.getConnection()
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

async function todos_insert_fake(miolo, params) {
  const conn= miolo.db.getConnection()
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = conn.getModel('todos')

  const d= {
    name: 'Fake todo',
    done: true
  }
  const tid= await Todos.insert(d, options)

  return tid
}



export {todos_read, todos_count_last_hour, todos_insert_fake}