export default function useAuthType () {
  if (typeof window === 'undefined') {
    return process.env.AUTH_TYPE || 'credentials'
  }

  return window?.AUTH_TYPE || 'credentials'
}