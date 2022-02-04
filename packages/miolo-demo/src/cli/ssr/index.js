import {useState} from 'react'

const getDataFromWindow = (name) => {
  try {
    if (window != undefined) {
      const ssr_data= window.__STATE.ssr_data
      
      if (ssr_data!=undefined) {
        if (ssr_data[name]!=undefined) {
          window.__STATE.ssr_data[name] = undefined
          return ssr_data[name]
        }
      }
    }
  } catch(e) {}
    
  return undefined
}

const assertSsrData = (name) => getDataFromWindow(name) != undefined

const useSsrData = (state, name, defval) => {
  let data= defval!=undefined ? defval : {}

  if (state?.ssr_data != undefined && state?.ssr_data[name]!=undefined) {
    data= state.ssr_data[name]    
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