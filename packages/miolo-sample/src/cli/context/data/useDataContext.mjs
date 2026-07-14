// @ts-check

import { useContext } from "react"
import DataContext from "./DataContext.jsx"

/**
 * @typedef {import('./DataProvider.jsx').DataContextData} DataContextData
 * @returns {DataContextData}
 */
const useDataContext = () => useContext(DataContext)

export default useDataContext
