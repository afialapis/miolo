import {demo_app_api} from './api/todos.mjs'

const miolo_demo_app_client_guest = async () => {

  const {insert_todos, insert_fake_todo, remove_todos} = demo_app_api('guest')

  const tids= await insert_todos()
  await remove_todos(tids)
  const tid = await insert_fake_todo()
  await remove_todos([tid])
}

export {miolo_demo_app_client_guest}