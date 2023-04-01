
const getSsrDataFromWindow = (name) => {
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

export default getSsrDataFromWindow
