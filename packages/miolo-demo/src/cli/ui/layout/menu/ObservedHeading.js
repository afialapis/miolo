import React, {useCallback} from 'react'

const ObservedHeading = ({Tag, children, onHeadingObserve, ...props}) => {

  const ref = useCallback(node => {
    if (node !== null) {
      onHeadingObserve(node)
    }
  }, [onHeadingObserve])


  return (
    <Tag ref={ref}
         {...props}>
      {children}
    </Tag>
  )
}

export default ObservedHeading