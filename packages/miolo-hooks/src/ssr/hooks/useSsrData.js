import {useState, useCallback, useEffect} from 'react'

const _getDataFromWindow = (name) => {
  try {
    if (window != undefined) {
      const ssr_data= window.__CONTEXT.ssr_data
      
      if (ssr_data!=undefined) {
        if (ssr_data[name]!=undefined) {
          return ssr_data[name]
        }
      }
    }
  } catch(e) {}
    
  return undefined
}

const _getSsrDataFromContext = (context, name) => {
  let data= undefined

  if (context?.ssr_data != undefined && context?.ssr_data[name]!=undefined) {
    data= context.ssr_data[name]
  } else {
    const wdata= _getDataFromWindow(name)
    if (wdata != undefined) {
      data= wdata
    }
  }
  
  return data
}


const useSsrData = (context, name, defval, loader) => {

  const ssrDataFromContext = _getSsrDataFromContext(context, name)
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

export {useSsrData}