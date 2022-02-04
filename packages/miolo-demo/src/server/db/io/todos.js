import {epoch_now} from 'intre'
import {getModel} from 'miolo'

async function todos_read() {
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await getModel('miolo', 'todos')
  const todos = Todos.read(options)

  return todos
}


async function todos_count_last_hour(conn) { 
  // TODO : handle transactions
  const options= {transaction: undefined}

  const one_hour_ago = epoch_now() - 60*60

  const query = `
    SELECT COUNT(1) as cnt
      FROM todos
     WHERE CREATED >= $1`;

  const data= await conn.select(query, [one_hour_ago], options) 
  const res= data[0]['cnt']

  return res
}

async function todos_insert_fake(conn) {
  // TODO : handle transactions
  const options= {transaction: undefined}

  const Todos = await getModel('miolo', 'todos')

  const d= {
    name: 'Fake todo',
    done: true
  }
  const tid= await Todos.insert(d, options)

  return tid
}



export {todos_read, todos_count_last_hour, todos_insert_fake}