import Joi from 'joi'
import {with_miolo_schema} from 'miolo'
import {todos_count_last_hours, todos_insert_fake} from '#server/db/todos.mjs'

export default [{
  prefix: '/crud',
  routes: [
    {
      url: '/todos/last_hours',
      method: 'GET',
      // Passing schema on the route definition
      callback: todos_count_last_hours,
      schema: Joi.object({
        hours: Joi.number().min(1).max(24)
      })
    },
    {
      url: '/todos/fake',
      method: 'POST',
      // Wrapping function with the schema
      callback: with_miolo_schema(todos_insert_fake, Joi.object({
        done: Joi.bool().optional().default(false)
      })),
      auth: {
        require: true,
        action: 'redirect',
        redirect_url: '/'
      },         
    }
  ]
}]


