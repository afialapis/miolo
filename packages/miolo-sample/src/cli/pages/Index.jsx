import useSessionContext from "#cli/context/session/useSessionContext.mjs"
import IndexOffline from "#cli/pages/IndexOffline.jsx"
import IndexOnline from "#cli/pages/IndexOnline.jsx"

export default function Index() {
  const { authenticated } = useSessionContext()

  if (!authenticated) {
    return <IndexOffline />
  }

  return <IndexOnline />
}
