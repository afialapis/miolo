import Joi from 'joi'
import {todos_count_last_hours, todos_insert_fake} from '#server/db/todos.mjs'

export default [{
  prefix: '/crud',
  routes: [
    {
      url: '/todos/last_hours',
      method: 'GET',
      callback: todos_count_last_hours,
      schema: Joi.object({
        hours: Joi.number().min(1).max(24)
      })
    },
    {
      url: '/todos/fake',
      method: 'POST',
      callback: todos_insert_fake,
      schema: Joi.object({
        done: Joi.bool().optional().default(false)
      }),
      auth: {
        require: true,
        action: 'redirect',
        redirect_url: '/'
      },         
    }
  ]
}]


