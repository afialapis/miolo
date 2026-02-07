import Joi from 'joi'
import { with_miolo_schema } from 'miolo'


import { 
  r_forgot, 
  r_change_password, 
  r_user_save
} from './users/user.mjs'

import { 
  r_todo_list,
  r_todo_find
} from './todos/read.mjs'

import { 
  r_todo_upsave,
  r_todo_delete,
  r_todo_toggle_done
} from './todos/mod.mjs'

import { 
  r_todo_count_last_hours,
  r_todo_insert_fake
} from './todos/special.mjs'

const auth= {
  require: true,
  action: 'redirect',
  redirect_url: '/page/login'
}

export default [{
  prefix: 'api',
  routes: [
    {method: 'POST', url: '/user/forgot',                          callback: r_forgot},
    {method: 'POST', url: '/user/chpwd',        auth, callback: r_change_password},
    {method: 'POST', url: '/user/save',         auth, callback: r_user_save},

    {method: 'GET',  url: '/todo/list',         auth, callback: r_todo_list},
    {method: 'GET',  url: '/todo/findone',      auth, callback: r_todo_find},
    {method: 'POST', url: '/todo/upsave',       auth, callback: r_todo_upsave},
    {method: 'POST', url: '/todo/delete',       auth, callback: r_todo_delete},
    {method: 'POST', url: '/todo/toggle',       auth, callback: r_todo_toggle_done},

    {
      url: '/todo/last_hours',
      method: 'GET',
      // Passing schema on the route definition
      callback: r_todo_count_last_hours,
      schema: Joi.object({
        hours: Joi.number().min(1).max(24)
      })
    },
    {
      url: '/todo/fake',
      method: 'POST',
      // Wrapping function with the schema
      callback: with_miolo_schema(r_todo_insert_fake, Joi.object({
        done: Joi.bool().optional().default(false)
      })),
      auth,         
    }

  ]
}]
