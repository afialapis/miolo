import React, { useCallback, useState } from "react"
import useSessionContext from "#cli/context/session/useSessionContext.mjs"
import TodoList from "#ns/models/TodoList.mjs"
import DataContext from "./DataContext.jsx"

const DataProvider = ({ children }) => {
  const [status, setStatus] = useState("loaded")
  const [breads, setBreads] = useState([])
  const { useSsrData } = useSessionContext()

  const [todos, _setTodos, refreshTodos] = useSsrData("todos", [], async (context, fetcher) => {
    setStatus("loading")
    const { data: nTodos } = await fetcher.get("/api/todo/list")
    setStatus("loaded")
    return new TodoList(nTodos)
  })

  const setTitle = useCallback((title) => {
    if (document) {
      document.title = title
    }
  }, [])

  return (
    <DataContext.Provider
      value={{
        todos,
        refreshTodos,
        loading: status !== "loaded",
        loaded: status === "loaded",
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
