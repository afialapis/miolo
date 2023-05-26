import React from 'react'

const ErrMessage = ({ctx, error}) => {
  return (
    <div>
      {`[MIOLO-SERVER_TOOLS] Missing SSR renderer: ${error.toString()}`}
    </div>
  )
}

export default ErrMessage