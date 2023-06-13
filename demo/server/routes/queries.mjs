import {todos_count_last_hour, todos_insert_fake} from '../db/todos.mjs'

async function q_todos_count_last_hour(ctx) {
  const conn= ctx.miolo.db.getConnection()
  const res= await todos_count_last_hour(conn)

  ctx.body = res
}

async function q_todos_insert_fake(ctx) {
  const conn= ctx.miolo.db.getConnection()
  const tid= await todos_insert_fake(conn)

  ctx.body = {id: tid}
}


export default [{
  prefix: '/crud',
  routes: [
    {
      url: '/todos/last_hour',
      method: 'GET',
      callback: q_todos_count_last_hour
    },
    {
      url: '/todos/fake',
      method: 'POST',
      callback: q_todos_insert_fake,
      auth: {
        require: true,
        action: 'redirect',
        redirect_url: '/'
      },         
    }
  ]
}]


