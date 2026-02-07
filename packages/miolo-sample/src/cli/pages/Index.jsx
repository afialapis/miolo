import React from 'react'
import useSessionContext from '#cli/context/session/useSessionContext.mjs'
import IndexOnline from '#cli/pages/IndexOnline.jsx'
import IndexOffline from '#cli/pages/IndexOffline.jsx'

export default function Index () {
  const {authenticated} = useSessionContext()

  if (!authenticated) {
    return <IndexOffline/>
  }

  return <IndexOnline/>
}