import React, {useState, useCallback} from 'react'
import TodosContext from './TodosContext.jsx'
import TodoList from '#ns/models/TodoList.mjs'

import useSessionContext from '#cli/context/session/useSessionContext.mjs'

const TodosProvider = ({children}) => {
  const [status, setStatus] = useState('loaded')
  const {useSsrData, fetcher, authType, authenticated} = useSessionContext()
  const [useCrud, setUseCrud] = useState(true)
  
  const [todoList, setTodoList, refreshTodoList] = useSsrData('todos', [], async (context, fetcher) => {
    setStatus('loading')
    let data
    if (useCrud) {
      const res = await fetcher.read('/crud/todo')     
      data = res.data
    } else {
      data = await fetcher.get('/api/todo/list') 
    }
    setStatus('loaded')
    return new TodoList(data.sort((a, b) => b.created_at - a.created_at))
  })
  

  const addTodo = useCallback((text) => {
    async function addIt() {
      const todoObject = {
        id: undefined,
        description: text,
        done: false,
      }

      if (useCrud) {
        const {data: todoId}= await fetcher.upsave('crud/todo', todoObject)
        todoObject.id= todoId
      } else {
        const {data}= await fetcher.post('/api/todo/upsave', todoObject)
        todoObject.id= data.id
      }

      setTodoList([todoObject, ...todoList])
    }

    addIt()

  }, [fetcher, todoList, setTodoList, useCrud])

  const toggleTodo = useCallback((todoId) => {

    async function toggleIt() {

      const nTodoList= [...todoList]
      const selectedTodoIndex = nTodoList.findIndex((item) => item.id == todoId)
      nTodoList[selectedTodoIndex].done = !nTodoList[selectedTodoIndex].done
  
      setTodoList(nTodoList)
      
      if (useCrud) {
        await fetcher.upsave('crud/todo', nTodoList[selectedTodoIndex])
      } else {
        await fetcher.post('/api/todo/toggle', {id: todoId, done: nTodoList[selectedTodoIndex].done})
      }
    }

    toggleIt()

  }, [fetcher, todoList, setTodoList, useCrud])

  const removeTodo = useCallback(async (todoId) => {
    const nTodoList= [...todoList]
    nTodoList.splice(
      nTodoList.findIndex((item) => item.id == todoId),
      1
    )

    setTodoList(nTodoList)

    if (useCrud) {
      await fetcher.remove('crud/todo', todoId)
    } else {
      await fetcher.post('api/todo/delete', {id: todoId})
    }
  }, [fetcher, todoList, setTodoList, useCrud])

  
  const checkLastHours = useCallback(async ({hours}) => {
    const {data: {count}}= await fetcher.get('api/todo/last_hours', {hours})
    alert(`You have added ${count} todos in the last ${hours} hours`)
  }, [fetcher])

  const insertFakeTodo = useCallback(async () => {
    const {ok, error, data: {id}} = await fetcher.post('api/todo/fake', {done: true})
    if (!ok) {
      alert(`Error adding fake todo: ${error}`)
    } else {
      alert(`Fake todo added with id ${id}`)
    }
    refreshTodoList()
  }, [fetcher, refreshTodoList])


  
  return (
    <TodosContext.Provider value={{
      todoList,
      refreshTodoList,
      loading: status!=='loaded',
      loaded: status==='loaded',
      addTodo,
      toggleTodo,
      removeTodo,
      checkLastHours,
      insertFakeTodo,
      canEdit: (authType!=='credentials' || authenticated),
      useCrud, 
      setUseCrud
    }}>
      {children}
    </TodosContext.Provider>
  )
}

export default TodosProvider
