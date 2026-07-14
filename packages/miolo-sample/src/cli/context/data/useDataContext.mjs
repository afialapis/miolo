import { useContext } from "react"
import DataContext from "./DataContext.jsx"

/**
 * @typedef {import('./DataContext.jsx').DataContextData} DataContextData
 * @returns {DataContextData}
 */
const useDataContext = () => useContext(DataContext)

export default useDataContext
