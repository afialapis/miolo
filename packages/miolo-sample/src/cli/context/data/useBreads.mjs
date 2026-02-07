import React, { useEffect } from "react"
import useDataContext from "./useDataContext.mjs"


const useBreads = (breadsCallback, dependencies = []) => {

  const {setTitle, setBreads} = useDataContext()

  useEffect(() => {
    const nBreads = breadsCallback()
    setBreads(nBreads)
    setTitle(nBreads.slice(-1))
  }, dependencies) // eslint-disable-line
}

export default useBreads
