import { useContext } from "react"
import MioloContext from "./MioloContext.mjs"

const withMioloContext = (BaseComponent) => (props) => {
  const context = useContext(MioloContext)

  return <BaseComponent {...props} {...context} />
}

export default withMioloContext
