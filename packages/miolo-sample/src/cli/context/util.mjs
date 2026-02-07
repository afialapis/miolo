export function isBrowser () {
  return typeof window !== 'undefined'
}

export function isDEVAndVite() {
  if (isBrowser()) {
    return window.__CONTEXT?.development === true
  }
  return process.env.NODE_ENV == 'development'
}

export function imgSrc(url) {
  // if (isDEVAndVite()) {
  //   return `http://localhost:8005/${url.startsWith("/") ? url.slice(1) : url}`
  // }
  return url
}