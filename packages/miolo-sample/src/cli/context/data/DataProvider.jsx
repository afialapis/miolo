import { useCallback, useState } from "react"
import useSessionContext from "#cli/context/session/useSessionContext.mjs"
import TodoList from "#ns/models/TodoList.mjs"
import DataContext from "./DataContext.jsx"

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
    modifier: (data) => data.sort((a, b) => b.created_at - a.created_at)
  })

  const setTitle = useCallback((title) => {
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
