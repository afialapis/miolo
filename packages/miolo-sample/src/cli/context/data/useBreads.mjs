import { useEffect } from "react"
import useDataContext from "./useDataContext.mjs"

const useBreads = (breadsCallback, dependencies = []) => {
  const { setTitle, setBreads } = useDataContext()

  // biome-ignore lint/correctness/useExhaustiveDependencies: new function breadsCallback each render
  useEffect(() => {
    const nBreads = breadsCallback()
    setBreads(nBreads)
    setTitle(nBreads.slice(-1))
  }, [setTitle, setBreads, ...dependencies])
}

export default useBreads
