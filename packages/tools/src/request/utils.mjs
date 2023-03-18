export function trim_left(str, what) {
  return str.replace(new RegExp(`^${what || '\\s'}+`), '')
}
