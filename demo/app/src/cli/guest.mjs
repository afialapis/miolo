import {insert_todos, insert_fake_todo, remove_todos} from '../../../commons/cli/todos.mjs'

const miolo_demo_app_client_guest = async () => {
  const tids= await insert_todos()
  await remove_todos(tids)
  const tid = await insert_fake_todo()
  await remove_todos([tid])
}

export {miolo_demo_app_client_guest}