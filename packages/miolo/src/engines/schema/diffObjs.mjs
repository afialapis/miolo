export function diffObjs(o1, o2) {
  const missingKeys = []

  function findMissing(obj1, obj2, prefix = "") {
    for (const key in obj1) {
      if (Object.hasOwn(obj1, key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key

        if (!obj2 || !(key in obj2)) {
          missingKeys.push(`'${fullKey}'`)
        } else if (
          typeof obj1[key] === "object" &&
          obj1[key] !== null &&
          typeof obj2[key] === "object" &&
          obj2[key] !== null &&
          !Array.isArray(obj1[key]) &&
          !Array.isArray(obj2[key])
        ) {
          findMissing(obj1[key], obj2[key], fullKey)
        }
      }
    }
  }

  findMissing(o1, o2)

  if (missingKeys.length === 0) {
    return ""
  }

  const isPlural = missingKeys.length > 1
  let keysStr = ""
  if (!isPlural) {
    keysStr = missingKeys[0]
  } else {
    const lastKey = missingKeys.pop()
    keysStr = `${missingKeys.join(", ")} and ${lastKey}`
  }

  return keysStr
}
