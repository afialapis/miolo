import {useState, useCallback, useEffect} from 'react'

const _getDataFromWindow = (name) => {
  try {
    if (window != undefined) {
      const ssr_data= window.__CONTEXT.ssr_data
      
      if (ssr_data!=undefined) {
        if (ssr_data[name]!=undefined) {
          //window.__CONTEXT.ssr_data[name] = undefined
          return ssr_data[name]
        }
      }
    }
  } catch(e) {}
    
  return undefined
}

const _assertSsrData = (name) => _getDataFromWindow(name) != undefined

const _getSsrData = (context, name, defval) => {
  let data= defval!=undefined ? defval : {}

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

  const [ssrData, setSsrData] = useState(_getSsrData(context, name, defval))

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
      if (! _assertSsrData(name)) {
        refreshSsrData()
      }
    } catch(e) {}
  }) 

  return [ssrData, setSsrData, refreshSsrData]
}

export {useSsrData}