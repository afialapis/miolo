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
  r_todo_save,
  r_todo_update,
  r_todo_delete,
  r_todo_toggle_done
} from './todos/save.mjs'

const auth= {
  require: true,
  action: 'redirect',
  redirect_url: '/page/login'
}

export default [{
  prefix: '',
  routes: [
    {method: 'POST', url: '/user/forgot',                          callback: r_forgot},
    {method: 'POST', url: '/user/chpwd',                     auth, callback: r_change_password},
    {method: 'POST', url: '/api/user/save',                  auth, callback: r_user_save},

    {method: 'GET',  url: '/api/todo/list',              auth, callback: r_todo_list},
    {method: 'GET',  url: '/api/todo/findone',           auth, callback: r_todo_find},
    {method: 'POST', url: '/api/todo/save',              auth, callback: r_todo_save},
    {method: 'POST', url: '/api/todo/update',            auth, callback: r_todo_update},
    {method: 'POST', url: '/api/todo/delete',            auth, callback: r_todo_delete},
    {method: 'POST', url: '/api/todo/toggle_done',   auth, callback: r_todo_toggle_done},
    
  ]
}]
