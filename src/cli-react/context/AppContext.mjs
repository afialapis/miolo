import React , {useState, useEffect} from 'react'
import Context from './Context.mjs'
import { miolo_client } from '../../cli/index.mjs'
import { useSsrDataOrReload } from '../ssr/useSsrDataOrReload.mjs'


const AppContext = ({context, children}) => {
  const [innerContext, setInnerContext]= useState(context)
  const [mioloObj, setMioloObj]= useState(miolo_client(context))
    
  useEffect(() => {
    setInnerContext(context)
    setMioloObj(miolo_client(context))
  }, [context])
  
  const login = async (credentials) => {
    const url = innerContext.config.login_url || '/login'
    const resp = await mioloObj.fetcher.login(url, credentials)

    if (resp?.data) {
      const nContext = {
        ...innerContext,
        ...resp?.data
      }    

      if (resp?.data?.authenticated) {
        setInnerContext(nContext)
      }

      return resp?.data
    }

    return {}
  } 

  
  const logout = async () => {
    const url = innerContext.config.logout_url || '/logout'
    const _resp = await mioloObj.fetcher.logout(url)
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




  const useSsrData = (name, defval, loader) => {
    return useSsrDataOrReload(innerContext, name, defval, loader)
  }  

  return (
    <Context.Provider 
      value={{
        //context: innerContext, 
        //setContext: setInnerContext,
        //miolo: mioloObj,
        user: innerContext.user,
        authenticated: innerContext.authenticated,
        fetcher: mioloObj.fetcher,
        login,
        logout,
        useSsrData
      }}>
      {children}
    </Context.Provider>
  )
}


export default AppContext
