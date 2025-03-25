import {todos_count_last_hours, todos_insert_fake} from '../db/todos.mjs'


async function q_todos_insert_fake(ctx) {
  const tid= await todos_insert_fake(ctx.miolo, ctx.request.body)

  ctx.body = {id: tid}
}


export default [{
  prefix: '/crud',
  routes: [
    {
      url: '/todos/last_hours',
      method: 'GET',
      callback_fn: todos_count_last_hours
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


