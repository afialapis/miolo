import React, {useCallback} from 'react'
import {withContext} from '../../miolo-cli.mjs'
import LogoutForm from './LogoutForm.mjs'

const Logout = ({miolo}) => {
  
  const doTheLogout = useCallback(async () => {
    const _= await miolo.fetcher.logout('/logout')
  }, [miolo])

  return (
    <LogoutForm
      onLogout = {doTheLogout}
    />
  )
}

export default withContext(Logout)


