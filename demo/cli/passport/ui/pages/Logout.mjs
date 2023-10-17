import React, {useCallback} from 'react'
import {withContext} from '../../../../miolo-cli-react.mjs'
import LogoutForm from './LogoutForm.mjs'

const Logout = ({miolo}) => {
  
  const doTheLogout = useCallback(async () => {
    const _resp = await miolo.fetcher.logout('/logout')
    // resp.redirected= true
  }, [miolo])

  return (
    <LogoutForm
      onLogout = {doTheLogout}
    />
  )
}

export default withContext(Logout)


