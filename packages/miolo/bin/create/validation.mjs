/**
 * Validation helper functions for create command
 */

/**
 * Validates app name (alphanumeric + hyphens/underscores)
 */
export function validateAppName(name) {
  if (!name) {
    throw new Error('App name is required')
  }
  if (!/^[a-z0-9-_]+$/i.test(name)) {
    throw new Error('App name must contain only alphanumeric characters, hyphens, and underscores')
  }
  return true
}

/**
 * Validates auth method
 */
export function validateAuthMethod(authMethod) {
  const validAuthMethods = ['local', 'basic', 'guest']
  if (!validAuthMethods.includes(authMethod)) {
    throw new Error(`Invalid auth method: ${authMethod}. Valid options: ${validAuthMethods.join(', ')}`)
  }
  return true
}
