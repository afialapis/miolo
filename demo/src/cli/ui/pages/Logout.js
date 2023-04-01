import React, {useCallback} from 'react'
import {useFetcher} from '../../../../../dist/cli-react/miolo.cli-react.umd.js'
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


