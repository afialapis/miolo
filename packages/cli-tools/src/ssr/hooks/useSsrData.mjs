import {useState} from 'react'
import getSsrDataFromContext from './getSsrDataFromContext.mjs'


const useSsrData = (context, name, defval) => {

  const ssrDataFromContext = getSsrDataFromContext(context, name)
  const [ssrData, setSsrData] = useState(ssrDataFromContext != undefined ? ssrDataFromContext : defval)

  return [ssrData, setSsrData]
}

export {useSsrData}