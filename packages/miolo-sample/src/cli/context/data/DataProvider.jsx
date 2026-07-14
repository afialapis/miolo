// @ts-check

import { useCallback, useState } from "react"
import useSessionContext from "#cli/context/session/useSessionContext.mjs"
import TodoList from "#ns/models/TodoList.mjs"
import DataContext from "./DataContext.jsx"

/**
 * @typedef {import('#ns/models/Todo.mjs').default} Todo
 *
 * @typedef {Object} DataContextData
 * @property {TodoList} lastTodos - The list of last todos.
 * @property {(options?: Object) => Promise<void>} refreshLastTodos - Function to refresh the list of last todos.
 * @property {boolean} loading - Whether the data is loading.
 * @property {boolean} loaded - Whether the data is loaded.
 * @property {Array<Object>} breads - The list of breads.
 * @property {(breads: Array<Object>) => void} setBreads - Function to set the list of breads.
 * @property {(title: string) => void} setTitle - Function to set the title of the page.
 */

/**
 * @param {Object} props
 * @param {any} props.children
 */
const DataProvider = ({ children }) => {
  const [breads, setBreads] = useState([])
  const { useSsrData } = useSessionContext()

  const {
    data: lastTodos,
    refresh: refreshLastTodos,
    ready
  } = useSsrData("lastTodos", {
    url: "/api/todo/list",
    params: { options: { limit: 4 } },
    model: TodoList,
    modifier: (/** @type {TodoList} */ data) => data.sort((a, b) => b.created_at - a.created_at)
  })

  const setTitle = useCallback((/** @type {string} */ title) => {
    if (document) {
      document.title = title
    }
  }, [])

  return (
    <DataContext.Provider
      value={{
        lastTodos,
        refreshLastTodos,
        loading: !ready,
        loaded: ready,
        breads,
        setBreads,
        setTitle
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
