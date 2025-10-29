import Joi from 'joi'
import {todos_count_last_hours, todos_insert_fake} from '#server/db/todos.mjs'


async function q_todos_insert_fake(ctx) {
  const tid= await todos_insert_fake(ctx.miolo, ctx.request.body)

  ctx.body = {id: tid}
}

const schema = Joi.object({
  hours: Joi.number().min(1).max(24)
})

export default [{
  prefix: '/crud',
  routes: [
    {
      url: '/todos/last_hours',
      method: 'GET',
      callback_fn: todos_count_last_hours,
      schema
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


