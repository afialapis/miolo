import React, {useCallback} from 'react'
import {useFetcher} from 'miolo-cli-tools'
import LogoutForm from './LogoutForm'

const Logout = () => {
  const fetcher = useFetcher()
  
  const doTheLogout = useCallback(async () => {
    const _= await fetcher.post('/logout')
  }, [fetcher])

  return (
    <LogoutForm
      onLogout = {doTheLogout}
    />
  )
}

export default Logout


