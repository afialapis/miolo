import { useContext } from "react"
import TodosContext from "./TodosContext.jsx"

/**
 * @typedef {import('./TodosProvider.jsx').TodosProviderData} TodosProviderData
 * @returns {TodosProviderData}
 */
const useTodosContext = () => useContext(TodosContext)

export default useTodosContext
