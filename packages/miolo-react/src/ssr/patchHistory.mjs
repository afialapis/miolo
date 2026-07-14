let _historyPatched = false

export default function patchHistory() {
  if (typeof window === "undefined" || _historyPatched) return

  const originalPushState = window.history.pushState
  window.history.pushState = function (...args) {
    const ret = originalPushState.apply(this, args)
    window.dispatchEvent(new Event("miolo-navigation"))
    return ret
  }

  const originalReplaceState = window.history.replaceState
  window.history.replaceState = function (...args) {
    const ret = originalReplaceState.apply(this, args)
    window.dispatchEvent(new Event("miolo-navigation"))
    return ret
  }

  window.addEventListener("popstate", () => {
    window.dispatchEvent(new Event("miolo-navigation"))
  })

  _historyPatched = true
}
