import React , {useState, useEffect} from 'react'
import Context from './Context.mjs'
import { miolo_client } from '../../../cli/index.mjs'


const AppContext = ({context, children}) => {
  const [innerContext, setInnerContext]= useState(context)
  const [mioloObj, setMioloObj]= useState(miolo_client(context.config))
    
  useEffect(() => {
    setInnerContext(context)
  }, [context])
  
    
  useEffect(() => {
    setMioloObj(miolo_client(context.config))
  }, [context.config])


  const login = async (credentials) => {
    const {data} = await mioloObj.fetcher.login('/login', credentials)

    const nContext = {
      ...innerContext,
      ...data
    }    

    if (data.authenticated) {
      setInnerContext(nContext)
    }

    return data
  } 

  
  const logout = async () => {
    const _resp = await mioloObj.fetcher.logout('/logout')
    // resp.redirected= true

    const nContext = {
      ...innerContext,
      user: undefined,
      authenticated: false
    }    

    setInnerContext(nContext)
    
    return {
      user: undefined,
      authenticated: false
    }    
  }

  return (
    <Context.Provider 
      value={{
        context: innerContext, 
        //setContext: setInnerContext,
        miolo: mioloObj,
        login,
        logout,
      }}>
      {children}
    </Context.Provider>
  )
}


export default AppContext
