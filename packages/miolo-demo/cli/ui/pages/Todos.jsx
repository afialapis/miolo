import React, {useCallback} from 'react'
import {withMioloContext} from 'miolo-react'
import TodosList from './TodosList.jsx'

function _showTitle  (title) {
  if (document!=undefined) {
      document.title= title
  }
}

async function _todoListLoader(context, fetcher) {
  _showTitle('loading todos...')
  const {data: nTodoList} = await fetcher.read('crud/todos')     
  _showTitle('todos loaded!')
  return nTodoList
}

const Todos = ({authenticated, fetcher, useSsrData}) => {
  const [authType] = useSsrData('authType', 'guest')
  const [todoList, setTodoList, refreshTodoList] = useSsrData('todoList', [], _todoListLoader)

  const addTodo = useCallback((text) => {

    async function addIt() {

      const todoObject = {
        id: undefined,
        name: text,
        done: false,
      }

      const {data: todoId}= await fetcher.upsave('crud/todos', todoObject)
      todoObject.id= todoId

      setTodoList([todoObject, ...todoList])
    }

    addIt()

  }, [fetcher, todoList, setTodoList])


  const toggleTodo = useCallback((todoId) => {

    async function toggleIt() {

      const nTodoList= [...todoList]
      const selectedTodoIndex = nTodoList.findIndex((item) => item.id == todoId)
      nTodoList[selectedTodoIndex].done = !nTodoList[selectedTodoIndex].done
  
      setTodoList(nTodoList)

      await fetcher.upsave('crud/todos', nTodoList[selectedTodoIndex])
    }

    toggleIt()

  }, [fetcher, todoList, setTodoList])

  const removeTodo = useCallback((todoId) => {
    const nTodoList= [...todoList]
    nTodoList.splice(
      nTodoList.findIndex((item) => item.id == todoId),
      1
    )

    setTodoList(nTodoList)

    fetcher.remove('crud/todos', todoId)
  }, [fetcher, todoList, setTodoList])

  
  const checkLastHours = useCallback(async ({hours}) => {
    const {data}= await fetcher.get('crud/todos/last_hours', {hours})
    alert(`You have added ${data} todos in the last ${hours} hours`)
  }, [fetcher])

  const insertFakeTodo = useCallback(async () => {
    await fetcher.post('crud/todos/fake')
    refreshTodoList()
  }, [fetcher, refreshTodoList])

  return (   
      <TodosList
        authType       = {authType}
        authenticated  = {authenticated}
        todoList       = {todoList}
        addTodo        = {addTodo}
        toggleTodo     = {toggleTodo}
        removeTodo     = {removeTodo}
        checkLastHours  = {checkLastHours}
        insertFakeTodo = {insertFakeTodo}
      />
  )
}

export default withMioloContext(Todos)


