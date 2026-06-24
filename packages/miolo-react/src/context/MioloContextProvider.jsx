import { miolo_client } from "miolo-cli"
import { useCallback, useEffect, useState } from "react"
import { useSsrDataOrReload } from "../ssr/useSsrDataOrReload.mjs"
import Context from "./MioloContext.mjs"

const MioloContextProvider = ({ context, children }) => {
  const [innerContext, setInnerContext] = useState(context)
  const [mioloObj, setMioloObj] = useState(miolo_client(context))

  /*useEffect(() => {
    setInnerContext(context)
    setMioloObj(miolo_client(context))
  }, [context])*/

  const localLogin = useCallback(
    async (params) => {
      const { fetcher } = mioloObj
      const { config } = innerContext

      const url = config.login_url || "/login"
      const resp = await fetcher.post(url, params)

      if (resp?.data) {
        if (resp?.data?.authenticated) {
          setInnerContext((current) => {
            return {
              ...current,
              ...resp.data,
              config: {
                ...current.config,
                ...(resp.data?.config || {})
              }
            }
          })
        }

        return resp?.data
      }

      return {}
    },
    [innerContext, mioloObj]
  )

  const googleLogin = useCallback((redirect = "/") => {
    const url = `/auth/google?redirect=${encodeURIComponent(redirect)}`
    window.location.href = url
  }, [])

  const logout = useCallback(async () => {
    const { fetcher } = mioloObj
    const { config } = innerContext

    const url = config.logout_url || "/logout"
    const _resp = await fetcher.post(url)
    // resp.redirected= true

    setInnerContext((current) => {
      return {
        ...current,
        user: undefined,
        authenticated: false
      }
    })

    return {
      user: undefined,
      authenticated: false
    }
  }, [innerContext, mioloObj])

  const updateUser = useCallback((user) => {
    setInnerContext((current) => {
      return {
        ...current,
        user
      }
    })
  }, [])

  const useSsrData = (name, options) => {
    return useSsrDataOrReload(innerContext, mioloObj, name, options)
  }

  return (
    <Context.Provider
      value={{
        //context: innerContext,
        //setContext: setInnerContext,
        //miolo: mioloObj,
        user: innerContext.user,
        updateUser,
        authenticated: innerContext.authenticated,
        fetcher: mioloObj.fetcher,
        socket: mioloObj.socket,
        logger: mioloObj.logger,
        googleLogin,
        localLogin,
        logout,
        useSsrData,
        authMethod: innerContext?.config?.auth_method
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default MioloContextProvider
