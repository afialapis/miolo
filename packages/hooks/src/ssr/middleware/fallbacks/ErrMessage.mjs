import React from 'react'

const ErrMessage = ({ctx, error}) => {
  return (
    <div>
      {`[MIOLO-HOOKS] Missing SSR renderer: ${error.toString()}`}
    </div>
  )
}

export default ErrMessage