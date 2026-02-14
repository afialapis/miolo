---
name: miolo-auth
description: Authentication configuration and strategies for miolo applications. Use when implementing, modifying, or troubleshooting authentication, configuring auth strategies (local, basic, guest), or setting up user sessions.
---

# Miolo Authentication

Authentication configuration and strategies for miolo applications.

## Authentication Strategies

Miolo supports multiple built-in authentication strategies in `src/server/miolo/auth/`:

```
src/server/miolo/auth/
├── local.mjs          # Username/password authentication
├── basic.mjs          # HTTP Basic authentication
├── guest.mjs          # Guest/anonymous access
└── custom.mjs         # Custom authentication logic
```

## Configuring Authentication

Authentication is configured in `src/server/miolo/index.mjs`:

```javascript
import auth from './auth/local.mjs'
// or: import auth from './auth/basic.mjs'
// or: import auth from './auth/guest.mjs'

export default {
  auth,
  // ... other config
}
```

## Local Strategy (Default)

Username/password authentication with database-backed users.

**File:** `src/server/miolo/auth/local.mjs`

```javascript
import { db_user_auth } from '#server/db/io/users/auth.mjs'

export default {
  urls: {
    login: '/page/login',
    logout: '/page/logout',
    home: '/'
  },

  async login(ctx, credentials) {
    const { username, password } = credentials
    
    const user = await db_user_auth(ctx, { username, password })
    
    if (!user) {
      return { ok: false, error: 'Invalid credentials' }
    }
    
    return { ok: true, user }
  },

  async logout(ctx) {
    // Cleanup if needed
    return { ok: true }
  }
}
```

**Key elements:**
- `urls` - Define login, logout, home page paths
- `login(ctx, credentials)` - Validates credentials, returns user or error
- `logout(ctx)` - Optional cleanup on logout
- Uses database function from `db/io/users/auth.mjs`

## Basic Authentication

HTTP Basic Auth for simple API access.

**File:** `src/server/miolo/auth/basic.mjs`

```javascript
export default {
  async login(ctx, credentials) {
    const { username, password } = credentials
    
    // Validate against environment or database
    if (username === process.env.API_USER && 
        password === process.env.API_PASSWORD) {
      return {
        ok: true,
        user: { id: 1, username, role: 'api' }
      }
    }
    
    return { ok: false, error: 'Invalid credentials' }
  }
}
```

## Guest/Anonymous Access

Allow unauthenticated access (useful for read-only apps).

**File:** `src/server/miolo/auth/guest.mjs`

```javascript
export default {
  async login(ctx) {
    return {
      ok: true,
      user: { id: 0, username: 'guest', role: 'guest' }
    }
  }
}
```

## User Session

After successful login, user is available in routes:

```javascript
export async function r_protected_route(ctx, params) {
  const user = ctx.state.user
  
  // User object contains:
  // - id
  // - username
  // - email
  // - any other fields returned from login
  
  ctx.miolo.logger.info(`User ${user.id} accessing route`)
  
  return { ok: true, data: { userId: user.id } }
}
```

## Protecting Routes

Routes are protected by adding `auth` configuration:

```javascript
const auth = {
  require: true,
  action: 'redirect',
  redirect_url: '/page/login'
}

export default [{
  prefix: 'api',
  routes: [
    // Public route
    { method: 'GET', url: '/public/data', callback: r_public },
    
    // Protected route
    { method: 'GET', url: '/user/profile', auth, callback: r_profile },
  ]
}]
```

## Database User Authentication

User authentication typically queries the database:

**File:** `src/server/db/io/users/auth.mjs`

```javascript
import { sha512 } from '#server/utils/crypt.mjs'

export async function db_user_auth(ctx, params) {
  const { username, password } = params
  
  const salt = process.env.MIOLO_SESSION_SALT
  const hashedPassword = sha512(password, salt)
  
  const user = await ctx.miolo.db.query(`
    SELECT id, username, email, name
    FROM u_user
    WHERE username = $1 AND password = $2
  `, [username, hashedPassword])
  
  return user.rows[0] || null
}
```

**Key elements:**
- Hash password with session salt
- Query user by username and hashed password
- Return user object or null
- Don't return password in user object

## Password Hashing

Use the provided crypto utilities:

```javascript
import { sha512 } from '#server/utils/crypt.mjs'

const salt = process.env.MIOLO_SESSION_SALT
const hashedPassword = sha512(plainPassword, salt)
```

**Session salt** is configured in `.env`:
```
MIOLO_SESSION_SALT=your-random-salt-here
```

## Changing Password

Pattern for password change:

**File:** `src/server/db/io/users/pwd.mjs`

```javascript
import { sha512 } from '#server/utils/crypt.mjs'

export async function db_user_change_password(ctx, params) {
  const { user_id, old_password, new_password } = params
  
  const salt = process.env.MIOLO_SESSION_SALT
  
  // Verify old password
  const user = await ctx.miolo.db.query(`
    SELECT id FROM u_user
    WHERE id = $1 AND password = $2
  `, [user_id, sha512(old_password, salt)])
  
  if (user.rows.length === 0) {
    throw new Error('Invalid current password')
  }
  
  // Update to new password
  const newHash = sha512(new_password, salt)
  await ctx.miolo.db.query(`
    UPDATE u_user
    SET password = $1
    WHERE id = $2
  `, [newHash, user_id])

  return { changed: true }
}
```

## Custom Authentication

For complex scenarios, implement custom logic:

**File:** `src/server/miolo/auth/custom.mjs`

```javascript
export default {
  urls: {
    login: '/auth/custom',
    logout: '/auth/logout',
    home: '/'
  },

  async login(ctx, credentials) {
    // Custom logic: OAuth, LDAP, etc.
    const user = await yourCustomAuthLogic(credentials)
    
    if (!user) {
      return { ok: false, error: 'Authentication failed' }
    }
    
    return { ok: true, user }
  },

  async logout(ctx) {
    // Custom cleanup
    await yourCustomLogoutLogic(ctx)
    return { ok: true }
  }
}
```

## Best Practices

1. **Never store plain passwords** - Always hash with salt
2. **Use strong session salt** - Set `MIOLO_SESSION_SALT` in `.env`
3. **Don't return passwords** - User object should never include password
4. **Validate on server** - Never trust client-side authentication
5. **Use HTTPS in production** - Protect credentials in transit
6. **Rate limit login attempts** - Prevent brute force attacks
7. **Log authentication events** - Track successful and failed logins

## Examples from miolo-sample

See actual implementations:
- `src/server/miolo/auth/local.mjs` - Default auth strategy
- `src/server/db/io/users/auth.mjs` - User authentication query
- `src/server/db/io/users/pwd.mjs` - Password change logic
- `src/server/utils/crypt.mjs` - Hashing utilities
