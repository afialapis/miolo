import { useMioloContext } from "miolo-react"
import { useCallback, useEffect, useState } from "react"
import useSessionContext from "#cli/context/session/useSessionContext.mjs"
import useUIContext from "#cli/context/ui/useUIContext.mjs"
import TodoList from "#ns/models/TodoList.mjs"
import TodosContext from "./TodosContext.jsx"

const TodosProvider = ({ children }) => {
  // const [status, setStatus] = useState("loaded")
  const { logger } = useMioloContext()
  const { useSsrData, fetcher, socket, authenticated } = useSessionContext()
  const { toast } = useUIContext()
  const [useCrud, setUseCrud] = useState(false)
  const [socketInited, setSocketInited] = useState(false)

  const {
    data: todoList,
    setData: setTodoList,
    refresh: refreshTodoList,
    ready
    // invalidate: invalidateTodoList
  } = useSsrData("todos", {
    model: TodoList,
    loader: useCallback(
      async (_context, fetcher) => {
        //setStatus("loading")
        const res = useCrud ? await fetcher.read("/crud/todo") : await fetcher.get("/api/todo/list")

        if (!res.ok) {
          toast.error(`Error loading todos: ${res.error}`)
        }
        const data = res?.data || []
        //setStatus("loaded")
        return data.sort((a, b) => b.created_at - a.created_at)
      },
      [useCrud, toast]
    ),
    cache: true
  })

  const addTodo = useCallback(
    (text) => {
      async function addIt() {
        const todoObject = {
          id: undefined,
          description: text,
          done: false
        }

        const res = useCrud
          ? await fetcher.upsave("crud/todo", todoObject)
          : await fetcher.post("/api/todo/upsave", todoObject)

        if (!res.ok) {
          toast.error(`Error adding todo: ${res.error}`)
        }

        todoObject.id = useCrud ? res?.data : res?.data?.id

        setTodoList([todoObject, ...todoList.getData()])
      }

      addIt()
    },
    [fetcher, todoList, setTodoList, useCrud, toast]
  )

  const toggleTodo = useCallback(
    (todoId) => {
      async function toggleIt() {
        const nTodoList = [...todoList.getData()]
        const selectedTodoIndex = nTodoList.findIndex((item) => item.id === todoId)
        nTodoList[selectedTodoIndex].done = !nTodoList[selectedTodoIndex].done

        setTodoList(nTodoList)

        const res = useCrud
          ? await fetcher.upsave("crud/todo", nTodoList[selectedTodoIndex])
          : await fetcher.post("/api/todo/toggle", {
              id: todoId,
              done: nTodoList[selectedTodoIndex].done
            })

        if (!res.ok) {
          toast.error(`Error toggling todo: ${res.error}`)
        }
      }

      toggleIt()
    },
    [fetcher, todoList, setTodoList, useCrud, toast]
  )

  const removeTodo = useCallback(
    async (todoId) => {
      const nTodoList = [...todoList.getData()]
      nTodoList.splice(
        nTodoList.findIndex((item) => item.id === todoId),
        1
      )

      setTodoList(nTodoList)

      const res = useCrud
        ? await fetcher.remove("crud/todo", todoId)
        : await fetcher.post("api/todo/delete", { id: todoId })

      if (!res.ok) {
        toast.error(`Error removing todo: ${res.error}`)
      } else {
        toast.info(`Todo removed successfully`)
      }
    },
    [fetcher, todoList, setTodoList, useCrud, toast]
  )

  const checkLastHours = useCallback(
    async ({ hours }) => {
      const res = await fetcher.get("api/todo/last_hours", { hours })
      if (res.ok === true) {
        toast.info(`You have added ${res?.data?.count} todos in the last ${hours} hours`)
      } else {
        toast.error(`Error checking last hours: ${res.error}`)
      }
    },
    [fetcher, toast]
  )

  const insertFakeTodo = useCallback(async () => {
    const res = await fetcher.post("api/todo/fake", { done: true })

    if (!res.ok) {
      toast.error(`Error adding fake todo: ${res.error}`)
    } else {
      toast.info(`Fake todo added with id ${res?.data?.id}`)
    }
    refreshTodoList()
  }, [fetcher, refreshTodoList, toast])

  const pingSocket = useCallback(() => {
    if (!socket) {
      toast.error("Socket not initialized")
      return
    }
    socket.emit("ping", { timestamp: new Date().toISOString() })
  }, [socket, toast])

  useEffect(() => {
    if (socket === undefined) {
      return
    }

    if (socketInited) {
      return
    }
    setSocketInited(true)

    socket.on("connect", () => {
      logger.info("Connected to server!")
    })

    socket.on("todos-update", (data) => {
      logger.info("TODOS UPDATED!!!")
      logger.info(data)
    })
  }, [socket, socketInited, logger])

  return (
    <TodosContext.Provider
      value={{
        todoList,
        refreshTodoList,
        loading: !ready,
        loaded: ready,
        addTodo,
        toggleTodo,
        removeTodo,
        checkLastHours,
        insertFakeTodo,
        canEdit: authenticated,
        useCrud,
        setUseCrud,
        pingSocket
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosProvider
