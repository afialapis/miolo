/**
 * Validation helper functions for create command
 */

/**
 * Validates app name (alphanumeric + hyphens/underscores)
 */
export function validateAppName(name) {
  if (!name) {
    throw new Error("App name is required")
  }
  if (!/^[a-z0-9-_]+$/i.test(name)) {
    throw new Error("App name must contain only alphanumeric characters, hyphens, and underscores")
  }
  return true
}

/**
 * Validates auth method
 */
export function validateAuthType(authType) {
  const validAuthTypes = ["passport", "basic", "guest"]
  if (!validAuthTypes.includes(authType)) {
    throw new Error(`Invalid auth type: ${authType}. Valid options: ${validAuthTypes.join(", ")}`)
  }
  return true
}
