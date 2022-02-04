import React from 'react'
import Index from 'cli/ui/Index'

const ssr_render_for_location = (location, state) => {
  return (
    <Index state={state}/>
  )
}

export {ssr_render_for_location}


