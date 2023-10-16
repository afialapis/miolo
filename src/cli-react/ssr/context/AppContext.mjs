import React, {useState, useEffect} from 'react'
import Context from './Context.mjs'
import { miolo_client } from '../../../cli/index.mjs'


const AppContext = ({context, config, children}) => {
  const [innerContext, setInnerContext]= useState(context)
  const [mioloObj, setMioloObj]= useState(miolo_client(config))
  
  useEffect(() => {
    setInnerContext(context)
  }, [context])

  
  useEffect(() => {
    setMioloObj(miolo_client(config))
  }, [config])

  return (
    <Context.Provider 
      value={{
        context: innerContext, 
        setContext: setInnerContext,
        miolo: mioloObj
      }}>
      {children}
    </Context.Provider>
  )
}


export default AppContext
