import {useState, useCallback, useEffect} from 'react'
import getSsrDataFromContext from './getSsrDataFromContext'

const useSsrDataOrReload = (context, name, defval, loader) => {

  const ssrDataFromContext = getSsrDataFromContext(context, name)
  const [ssrData, setSsrData] = useState(ssrDataFromContext != undefined ? ssrDataFromContext : defval)
  const [needToRefresh, setNeedToRefresh] = useState(ssrDataFromContext == undefined)

  const refreshSsrData = useCallback(() => {
    async function fetchData() {
      if (loader != undefined) {
        let nSsrData = await loader()
        setSsrData(nSsrData)
      }
    }

    fetchData()
  }, [loader]) 
  
  useEffect(() => {
    try {
      if (needToRefresh) {
        setNeedToRefresh(false)
        refreshSsrData()
      }
    } catch(e) {}
  }, [needToRefresh, refreshSsrData]) 

  return [ssrData, setSsrData, refreshSsrData]
}

export {useSsrDataOrReload}