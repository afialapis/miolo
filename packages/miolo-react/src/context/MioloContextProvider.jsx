import { miolo_client } from "miolo-cli"
import { useCallback, /*useEffect,*/ useState } from "react"
import { useSsrDataOrReload } from "../ssr/useSsrDataOrReload.mjs"
import Context from "./MioloContext.mjs"

/**
 * @typedef {import('../ssr/useSsrDataOrReload.mjs').MioloSSRData} MioloSSRData
 * @typedef {import('../ssr/useSsrDataOrReload.mjs').MioloSSRDataOptions} MioloSSRDataOptions
 *
 * @typedef {Object} MioloContextData
 * @property {Object} user - session's data as in app.ctx
 * @property {boolean} authenticated - authenticated flag as in app.ctx
 * @property {Function} updateUser - function to update user
 * @property {Function} googleLogin - function to login with google
 * @property {Function} localLogin - function to login with local
 * @property {Function} logout - function to logout
 * @property {(name: string, options: MioloSSRDataOptions) => MioloSSRData} useSsrData - function to handle some ssr data
 * @property {string} authMethod - authentication method
 */

/**
 * @param {Object} context - Miolo's app.ctx object
 * @param {React.ReactNode} children - React children
 * @returns {React.ReactNode}
 */
const MioloContextProvider = ({ context, children }) => {
  const [innerContext, setInnerContext] = useState(context)
  const [mioloObj, _setMioloObj] = useState(miolo_client(context))

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
