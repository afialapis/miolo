import React, {useState, useEffect} from 'react'
import Context from './Context.mjs'

const AppContext = ({context, children}) => {
  const [innerContext, setInnerContext]= useState(context)
  
  useEffect(() => {
    setInnerContext(context)
  }, [context])


  return (
    <Context.Provider value={{context: innerContext, setContext: setInnerContext}}>
      {children}
    </Context.Provider>
  )
}


export default AppContext
