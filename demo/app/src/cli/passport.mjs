import {login, logout} from '../../../commons/cli/auth.mjs'
import {insert_todos, 
  insert_fake_todo, 
  count_last_hour_todos, 
  remove_todos} from '../../../commons/cli/todos.mjs'

const AUTH= {
  username: 'todoer',
  password: 'todoer'
}

const miolo_demo_app_client_passport = async () => {
  const cookie= await login(AUTH)

  const tids= await insert_todos({cookie})

  const count= await count_last_hour_todos(/*{cookie}*/) // auth not needed here
  console.log('·································································')
  console.log(`Inserted ${count} todos!`)
  console.log('·································································')

  await remove_todos(tids, {cookie})
  const tid = await insert_fake_todo({cookie})
  await remove_todos([tid], {cookie})

  await logout({cookie})

  
}

export {miolo_demo_app_client_passport}