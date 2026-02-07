import React, { useCallback } from 'react'
import useSessionContext from '#cli/context/session/useSessionContext.mjs'
import useBreads from '#cli/context/data/useBreads.mjs'
import SecurityForm from './SecurityForm.jsx'
import useUIContext from '#cli/context/ui/useUIContext.mjs'


export default function Security() {

  const {session, fetcher} = useSessionContext()
  const {toast} = useUIContext()

  const passwordChange= useCallback(async (pwds) => {
    try {
      const params= {username: session.username, passwords: pwds}
      const resp = await fetcher.post('/user/chpwd', params)
      if (resp.ok === true) {
        toast.success(resp.data.msg)
      }
      return {ok: true, error: undefined}
    } catch(e) {
      return {ok: false, error: `Error al modificar la contraseña: ${e}`}
    }
    
  }, [fetcher, session.username, toast])
  
  useBreads(() => [ ['/', 'Inicio'], ['Seguridad']], [])

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        <SecurityForm
            onChangePassword = {passwordChange}
          />
      </div>
    </div>
  )
}

