import {useState} from 'react'

const getDataFromWindow = (name) => {
  try {
    if (window != undefined) {
      const ssr_data= window.__CONTEXT.ssr_data
      
      if (ssr_data!=undefined) {
        if (ssr_data[name]!=undefined) {
          window.__CONTEXT.ssr_data[name] = undefined
          return ssr_data[name]
        }
      }
    }
  } catch(e) {}
    
  return undefined
}

const assertSsrData = (name) => getDataFromWindow(name) != undefined

const useSsrData = (context, name, defval) => {
  let data= defval!=undefined ? defval : {}

  if (context?.ssr_data != undefined && context?.ssr_data[name]!=undefined) {
    data= context.ssr_data[name]    
  } else {
    const wdata= getDataFromWindow(name)
    if (wdata != undefined) {
      data= wdata
    }
  }
  const [namedData, setNamedData]= useState(data)

  return [namedData, setNamedData]
}


export {assertSsrData, useSsrData}