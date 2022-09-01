
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

const getSsrDataFromContext = (context, name) => {
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

export default getSsrDataFromContext
