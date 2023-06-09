import {demo_app_api} from './api/todos.mjs'

const AUTH= {
  username: 'todoer',
  password: 'todoer'
}

const miolo_demo_app_client_basic_auth = async () => {

  const {set_auth, insert_todos, insert_fake_todo, remove_todos} = demo_app_api('basic')

  set_auth(AUTH)

  const tids= await insert_todos()
  await remove_todos(tids)
  const tid = await insert_fake_todo()
  await remove_todos([tid])
}


export {miolo_demo_app_client_basic_auth}