import React, {useState, useEffect} from 'react'
import {useMioloContext} from 'miolo-react'
import SessionContext from './SessionContext.mjs'
import makePermissioner from './makePermissioner.mjs'

const SessionProvider = ({ children }) => {
  const {user, ...props } = useMioloContext()
  //const [session, setSession] = useState(new Session(user))
  const [permiss, setPermiss] = useState(makePermissioner(user))

  useEffect(() => {
    //const nSession = new Session(user)
    //setSession(nSession)
    //setPermiss(makePermissioner(nSession))
    setPermiss(makePermissioner(user))
  }, [user])
  
  return (
    <SessionContext.Provider value={{
      session: user, permiss, ...props
    }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
