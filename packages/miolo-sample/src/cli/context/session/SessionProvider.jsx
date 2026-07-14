// @ts-check

import { useMioloContext } from "miolo-react"
import { useEffect, useState } from "react"
import makePermissioner from "./makePermissioner.mjs"
import SessionContext from "./SessionContext.mjs"

/**
 * @param {Object} props
 * @param {any} props.children
 */
const SessionProvider = ({ children }) => {
  const { user, ...props } = useMioloContext()
  //const [session, setSession] = useState(new Session(user))
  const [permiss, setPermiss] = useState(makePermissioner(user))

  useEffect(() => {
    //const nSession = new Session(user)
    //setSession(nSession)
    //setPermiss(makePermissioner(nSession))
    setPermiss(makePermissioner(user))
  }, [user])

  return (
    <SessionContext.Provider
      value={{
        session: user,
        permiss,
        ...props
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
