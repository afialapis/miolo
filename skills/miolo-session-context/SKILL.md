---
name: miolo-session-context
description: Session and context management for miolo applications. Use when working with user authentication, session state, context properties in routes/middleware (backend), or useMioloContext/SessionProvider (client). For permissions, fetcher, and SSR, see separate skills.
---

# Miolo Session & Context Management

Session and authentication context management in miolo applications (backend and client).

## Backend (Server-Side Context)

In route handlers and middleware, the `ctx` object provides access to request data and session state.

### Request Properties

Access request data through `ctx.request`:

```javascript
export async function r_create_item(ctx, params) {
  // Request body (POST data)
  const body = ctx.request.body
  
  // Client IP address
  const clientIp = ctx.request.ip
  
  ctx.miolo.logger.info(`Request from IP: ${clientIp}`)
  
  return { ok: true, data: body }
}
```

**Available properties:**
- `ctx.request.body` - POST/PUT request body
- `ctx.request.ip` - Client IP address

### Session Properties (All Auth Methods)

Common session properties available regardless of auth strategy:

```javascript
export async function r_get_profile(ctx, params) {
  // User object (null if not authenticated)
  const user = ctx.session.user
  
  // Authentication status (boolean)
  const isAuth = ctx.session.authenticated
  
  // Token (if using guest auth)
  const token = ctx.session.token
  
  if (!ctx.session.authenticated) {
    return { ok: false, error: 'Not authenticated' }
  }
  
  return { ok: true, data: ctx.session.user }
}
```

**Available properties:**
- `ctx.session.user` - User object (or `null`)
- `ctx.session.authenticated` - Boolean authentication status
- `ctx.session.token` - Auth token (guest auth only)

### Credentials Auth Methods

When using credentials authentication strategy, additional methods are available:

```javascript
export async function r_user_login(ctx, params) {
  const { username, password } = params
  
  // Attempt login
  await ctx.login(username, password)
  
  // Check authentication status
  if (ctx.isAuthenticated()) {
    ctx.miolo.logger.info(`User ${ctx.state.user.id} logged in`)
    return { ok: true, user: ctx.state.user }
  }
  
  return { ok: false, error: 'Invalid credentials' }
}

export async function r_user_logout(ctx, params) {
  ctx.logout()
  return { ok: true }
}

export async function r_protected_route(ctx, params) {
  // Check if NOT authenticated
  if (ctx.isUnauthenticated()) {
    return { ok: false, error: 'Authentication required' }
  }
  
  // Access authenticated user
  const user = ctx.state.user
  
  return { ok: true, data: user }
}
```

**Available methods (credentials auth):**
- `ctx.isAuthenticated()` - Returns `true` if user is authenticated
- `ctx.isUnauthenticated()` - Returns `true` if user is NOT authenticated
- `await ctx.login(username, password)` - Attempt to authenticate user
- `ctx.logout()` - End user session

**User access:**
- `ctx.state.user` - Authenticated user object (credentials auth)
- `ctx.session.user` - User object (all auth methods)

### Backend Usage Example

Complete route handler using session:

```javascript
export async function r_user_operation(ctx, params) {
  try {
    // Check authentication
    if (!ctx.session.authenticated) {
      return { ok: false, error: 'Authentication required' }
    }
    
    // Access user data
    const userId = ctx.session.user.id
    const userEmail = ctx.session.user.email
    
    // Log with user context
    ctx.miolo.logger.info(`[r_user_operation] User ${userId} performing operation`)
    
    // Perform operation
    const result = await db_user_operation(ctx, { 
      ...params, 
      user_id: userId 
    })
    
    return { ok: true, data: result }
    
  } catch (error) {
    ctx.miolo.logger.error(`[r_user_operation] Error: ${error}`)
    return { ok: false, error: error?.message }
  }
}
```

## Client-Side (React Context)

### useMioloContext Hook

The `useMioloContext` hook from `miolo-react` provides core session functionality:

```javascript
import { useMioloContext } from 'miolo-react'

function MyComponent() {
  const { 
    user, 
    updateUser, 
    authenticated, 
    fetcher,
    login, 
    logout,
    useSsrData 
  } = useMioloContext()

  if (!authenticated) {
    return <div>Please log in</div>
  }

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

**Available properties:**
- `user` - User object (or `null` if not authenticated)
- `updateUser(userData)` - Update user data in context
- `authenticated` - Boolean authentication status
- `fetcher` - Fetch wrapper with auth (see miolo-fetcher skill)
- `login(credentials)` - Authenticate user
- `logout()` - End session
- `useSsrData()` - Access SSR data (see miolo-ssr skill)

### SessionProvider Wrapper

The application typically wraps `useMioloContext` in a `SessionProvider` for additional functionality:

**File:** `src/cli/context/session/SessionProvider.jsx`

```javascript
import React, { useState, useEffect } from 'react'
import { useMioloContext } from 'miolo-react'
import SessionContext from './SessionContext.mjs'
import makePermissioner from './makePermissioner.mjs'

const SessionProvider = ({ children }) => {
  const { user, ...props } = useMioloContext()
  const [permiss, setPermiss] = useState(makePermissioner(user))

  useEffect(() => {
    setPermiss(makePermissioner(user))
  }, [user])
  
  return (
    <SessionContext.Provider value={{
      session: user, 
      permiss, 
      ...props
    }}>
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
```

**Adds:**
- `session` - Alias for user object
- `permiss` - Permissions object (see miolo-permissions skill)
- Passes through all `useMioloContext` properties

### useSessionContext Hook

Access the wrapped session context:

**File:** `src/cli/context/session/useSessionContext.mjs`

```javascript
import { useContext } from 'react'
import SessionContext from './SessionContext.mjs'

export default function useSessionContext() {
  const context = useContext(SessionContext)
  
  if (!context) {
    throw new Error('useSessionContext must be used within SessionProvider')
  }
  
  return context
}
```

**Usage:**
```javascript
import useSessionContext from '#cli/context/session/useSessionContext.mjs'

function ProfilePage() {
  const { 
    session,      // User object
    permiss,      // Permissions
    authenticated,
    logout 
  } = useSessionContext()

  if (!authenticated) {
    return <LoginPage />
  }

  return (
    <div>
      <h1>{session.name}</h1>
      <p>{session.email}</p>
      {permiss.can('admin') && <AdminPanel />}
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## Client-Side Usage Examples

### Login Flow

```javascript
import { useMioloContext } from 'miolo-react'

function LoginPage() {
  const { login } = useMioloContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const result = await login({ username, password })
    
    if (result.ok) {
      // Login successful, user context updated automatically
      navigate('/dashboard')
    } else {
      alert(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit">Login</button>
    </form>
  )
}
```

### Protected Component

```javascript
import useSessionContext from '#cli/context/session/useSessionContext.mjs'

function ProtectedComponent() {
  const { authenticated, session } = useSessionContext()

  if (!authenticated) {
    return null  // Or redirect to login
  }

  return (
    <div>
      <h2>Protected Content</h2>
      <p>User ID: {session.id}</p>
    </div>
  )
}
```

### Update User Data

```javascript
import { useMioloContext } from 'miolo-react'

function ProfileEditor() {
  const { user, updateUser } = useMioloContext()

  const handleUpdate = async (newData) => {
    const response = await fetch('/api/user/update', {
      method: 'POST',
      body: JSON.stringify(newData)
    })
    
    const result = await response.json()
    
    if (result.ok) {
      // Update user in context
      updateUser(result.data)
    }
  }

  return <ProfileForm onSubmit={handleUpdate} />
}
```

## Best Practices

### Backend

1. **Always check authentication** - Use `ctx.session.authenticated` or `ctx.isAuthenticated()`
2. **Use auth in routes** - Configure `auth` in route definition (see miolo-routing skill)
3. **Log with user context** - Include user ID in logs for debugging
4. **Include user_id in queries** - Enforce data ownership in database queries
5. **Handle unauthenticated gracefully** - Return appropriate error messages

### Client

1. **Use SessionProvider** - Wrap useMioloContext for extended functionality
2. **Check authenticated state** - Always verify before rendering protected content
3. **Handle login errors** - Display meaningful error messages to users
4. **Update context on changes** - Use `updateUser()` after profile updates
5. **Centralize auth logic** - Use contexts, don't duplicate auth checks

## Related Skills

- **miolo-auth** - Authentication strategies and configuration
- **miolo-routing** - Route protection and auth configuration
- **miolo-permissions** - Permission system using `permiss` object
- **miolo-fetcher** - Authenticated API requests (future skill)
- **miolo-ssr** - Server-side rendering with session (future skill)

## Examples from miolo-sample

See actual implementations:
- `src/server/routes/users/user.mjs` - Backend session usage
- `src/cli/context/session/SessionProvider.jsx` - SessionProvider wrapper
- `src/cli/context/session/useSessionContext.mjs` - Session hook
- `src/cli/pages/Index.jsx` - Auth-based routing
