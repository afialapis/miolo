import {users_make_table} from '../db/users.mjs'
import {todos_make_table, todos_count_last_hour, todos_insert_fake} from '../db/todos.mjs'


async function q_users_make_table(ctx) {
  const ok = await users_make_table(ctx.miolo)

  ctx.body = ok
}

async function q_todos_make_table(ctx) {
  const ok = await todos_make_table(ctx.miolo)

  ctx.body = ok
}

async function q_todos_insert_fake(ctx) {
  const tid= await todos_insert_fake(ctx.miolo, ctx.request.fields)

  ctx.body = {id: tid}
}
async function q_todos_clean(ctx) {
  const conn= ctx.miolo.db.getConnection()
  const qry= 'DELETE FROM todos'
  const res= await conn.executeAndCount(qry)

  ctx.body = res
}



export default [{
  prefix: '/crud',
  routes: [
    {
      url: '/users/make_table',
      method: 'POST',
      callback: q_users_make_table      
    },
    {
      url: '/todos/make_table',
      method: 'POST',
      callback: q_todos_make_table,       
    },
    {
      url: '/todos/last_hour',
      method: 'GET',
      callback_fn: todos_count_last_hour
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
    },
    {
      url: '/todos/clean',
      method: 'POST',
      callback: q_todos_clean,
      auth: {
        require: true,
        action: 'redirect',
        redirect_url: '/'
      },         
    }
  ]
}]


