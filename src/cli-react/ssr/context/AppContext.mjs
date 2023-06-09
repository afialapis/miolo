import React, {useState, useEffect} from 'react'
import Context from './Context.mjs'
import { miolo } from '../../../cli/index.mjs'


const AppContext = ({context, config, children}) => {
  const [innerContext, setInnerContext]= useState(context)
  const [mioloObj, setMioloObj]= useState(miolo(config))
  
  useEffect(() => {
    setInnerContext(context)
  }, [context])

  
  useEffect(() => {
    setMioloObj(miolo(config))
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
