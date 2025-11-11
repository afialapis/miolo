import {users_make_table} from '../db/users.mjs'
import {todos_make_table, todos_count_last_hour, todos_insert_fake, todos_clean} from '../db/todos.mjs'


export default [{
  prefix: '/queries',
  routes: [
    {
      url: '/users/make_table',
      method: 'POST',
      callback: users_make_table      
    },
    {
      url: '/todos/make_table',
      method: 'POST',
      callback: todos_make_table,       
    },
    {
      url: '/todos/last_hour',
      method: 'GET',
      callback_fn: todos_count_last_hour
    },
    {
      url: '/todos/fake',
      method: 'POST',
      callback: todos_insert_fake,
      auth: {
        require: true,
        action: 'redirect',
        redirect_url: '/'
      },         
    },
    {
      url: '/todos/clean',
      method: 'POST',
      callback: todos_clean,
      auth: {
        require: true,
        action: 'redirect',
        redirect_url: '/'
      },         
    }
  ]
}]


