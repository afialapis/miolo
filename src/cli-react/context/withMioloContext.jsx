import React, {useContext} from 'react'
import MioloContext from './MioloContext.mjs'

/* eslint react/display-name:0 */
const withMioloContext = (BaseComponent) => (props) => {
  const context = useContext(MioloContext)

  return (
    <BaseComponent {...props}
                   {...context}/>
  );
}


export default withMioloContext