---
name: miolo-auth
description: Authentication configuration and strategies for miolo applications. Use when implementing, modifying, or troubleshooting authentication, configuring auth strategies (passport, basic, guest), or setting up user sessions.
---

# Miolo Authentication

Authentication configuration and strategies for miolo applications.

## Authentication Strategies

Miolo supports multiple built-in authentication strategies:

```
src/server/miolo/auth/
├── passport.mjs       # Passport-based auth (local + OAuth2)
├── basic.mjs          # HTTP Basic authentication
└── guest.mjs          # Guest/anonymous access
```

## Configuring Authentication

Authentication is configured in `src/server/miolo/index.mjs`:

```javascript
import passport from './auth/passport.mjs'
// or: import auth from './auth/basic.mjs'
// or: import auth from './auth/guest.mjs'

export default {
  auth: {
    passport  // Enables Passport.js with local + Google OAuth2
  },
  // ... other config
}
```

## Passport Strategy (Recommended)

Unified authentication using Passport.js supporting both **local (username/password)** and **Google OAuth2**.

**File:** `src/server/miolo/auth/passport.mjs`

```javascript
import { db_find_user_by_id, db_auth_user, 
         db_user_find_or_create_from_google } from '#server/db/io/users/auth.mjs'

const get_user_id = (user, done, ctx) => {
  const uid = user?.id
  if (uid != undefined) {
    return done(null, uid)
  } else {
    const err = new Error('User id is undefined')
    return done(err, null)
  }
}

const find_user_by_id = (id, done, ctx) => {
  ctx.miolo.logger.debug(`[auth] find_user_by_id() - Searching user id ${id}`)
  db_find_user_by_id(ctx.miolo, id).then(user => {
    if (user == undefined) {
      const err = new Error('User not found')
      return done(err, null)
    } else {
      return done(null, user)
    }
  })
}

const local_auth_user = (username, password, done, ctx) => {
  ctx.miolo.logger.debug(`[auth][local] Checking credentials for ${username}`)
  
  db_auth_user(ctx.miolo, username, password).then(([user, msg]) => {
    if (user == undefined) {
      const err = new Error(msg)
      return done(err, null)
    } else {
      return done(null, user)
    }
  })
}

const google_auth_user = async (accessToken, refreshToken, profile, done, ctx) => {
  try {
    const google_id = profile.id
    const email = profile.emails?.[0]?.value
    const name = profile.displayName
    const google_picture = profile.photos?.[0]?.value

    ctx.miolo.logger.info(`[auth][google] Authenticated user: ${email}`)

    return db_user_find_or_create_from_google(
      ctx.miolo, email, name, google_id, google_picture
    ).then(([user, msg]) => {
      if (user == undefined) {
        const err = new Error(msg)
        return done(err, null)
      } else {
        return done(null, user)
      }
    })
  } catch (error) {
    ctx.miolo.logger.error(`[auth][google] Error: ${error}`)
    return done(error, null)
  }
}

export default {
  get_user_id,
  find_user_by_id,
  local_auth_user,
  local_url_login: '/login',
  local_url_logout: '/logout',
  local_url_login_redirect: undefined,
  local_url_logout_redirect: '/',
  google_auth_user,
  google_client_id: process.env.MIOLO_AUTH_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.MIOLO_AUTH_GOOGLE_CLIENT_SECRET,
  google_url_login: '/auth/google',
  google_url_callback: process.env.MIOLO_AUTH_GOOGLE_CALLBACK_URL || '/auth/google/callback',
  google_url_logout: '/logout',
  google_url_logout_redirect: '/'
}
```

### Passport Configuration Elements

#### Common Functions
- `get_user_id(user, done, ctx)` - Extracts user ID for session storage
- `find_user_by_id(id, done, ctx)` - Retrieves user by ID (session deserialization)

#### Local Authentication (Username/Password)
- `local_auth_user(username, password, done, ctx)` - Validates credentials
- `local_url_login` - Login endpoint (default: `/login`)
- `local_url_logout` - Logout endpoint (default: `/logout`)
- `local_url_login_redirect` - Redirect after login (optional)
- `local_url_logout_redirect` - Redirect after logout (default: `/`)

#### Google OAuth2 Authentication
- `google_auth_user(accessToken, refreshToken, profile, done, ctx)` - Handles Google profile
- `google_client_id` - Google OAuth2 client ID (from env)
- `google_client_secret` - Google OAuth2 client secret (from env)
- `google_url_login` - OAuth initiation endpoint (default: `/auth/google`)
- `google_url_callback` - OAuth callback endpoint (from env or `/auth/google/callback`)
- `google_url_logout` - Logout endpoint (default: `/logout`)
- `google_url_logout_redirect` - Redirect after logout (default: `/`)

### Environment Variables

**Required for Google OAuth2 (.env):**
```
MIOLO_AUTH_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
MIOLO_AUTH_GOOGLE_CLIENT_SECRET=your-client-secret
MIOLO_AUTH_GOOGLE_CALLBACK_URL=http://localhost:8001/auth/google/callback
```

**Session configuration:**
```
MIOLO_SESSION_SALT=your-random-salt-here
MIOLO_SESSION_SECRET=your-session-secret
MIOLO_SESSION_SAME_SITE=lax  # Required for Google OAuth2
```

### Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:8001`
   - Authorized redirect URIs: `http://localhost:8001/auth/google/callback`
5. Copy Client ID and Client Secret to your `.env`

### OAuth2 Flow

1. User clicks "Login with Google" → `window.location.href = '/auth/google'`
2. Server redirects to Google authentication page
3. User authenticates with Google
4. Google redirects back to `/auth/google/callback`
5. `google_auth_user` processes Google profile
6. User found/created in database
7. User logged in and redirected to home

### Frontend Login Button

```jsx
// For local login (POST form)
<form onSubmit={handleLocalLogin}>
  <input name="username" />
  <input name="password" type="password" />
  <button type="submit">Login</button>
</form>

// For Google OAuth2 (Navigate to endpoint)
<button onClick={() => window.location.href = '/auth/google'}>
  Login with Google
</button>
```

**IMPORTANT:** Google OAuth2 requires **navigation**, not fetch/AJAX:
```javascript
// ✅ CORRECT
window.location.href = '/auth/google'

// ❌ WRONG - Causes CORS errors
fetch('/auth/google')
```

## Basic Authentication

HTTP Basic Auth for simple API access.

**File:** `src/server/miolo/auth/basic.mjs`

```javascript
export default {
  async login(ctx, credentials) {
    const { username, password } = credentials
    
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

## Guest Authentication

Anonymous access without credentials.

**File:** `src/server/miolo/auth/guest.mjs`

```javascript
export default {
  make_guest_token: (session) => {
    return `guest-${Date.now()}-${Math.random()}`
  }
}
```

## User Session

After successful login, user is available in routes:

```javascript
export async function r_protected_route(ctx, params) {
  const user = ctx.state.user
  const isAuthenticated = ctx.session.authenticated
  
  // User object contains:
  // - id
  // - username (for local auth)
  // - email
  // - name
  // - google_id (for Google auth)
  // - google_picture (for Google auth)
  
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

## Database Functions

### User Authentication (Local)

**File:** `src/server/db/io/users/auth.mjs`

```javascript
import { sha512 } from '#server/utils/crypt.mjs'

export async function db_auth_user(miolo, username, password) {
  const conn = miolo.db
  const options = { transaction: undefined }
  
  const salt = process.env.MIOLO_SESSION_SALT
  const hashedPassword = sha512(password, salt)
  
  const query = `
    SELECT id, username, name, email, active, admin
    FROM u_user
    WHERE username = $1 AND password = $2 AND active = 1`
  
  const ruser = await conn.selectOne(query, [username, hashedPassword], options)
  
  if (ruser?.id == undefined) {
    return [undefined, 'Invalid credentials']
  } else {
    return [ruser, undefined]
  }
}
```

### User by ID

```javascript
export async function db_find_user_by_id(miolo, id) {
  const conn = miolo.db
  const options = { transaction: undefined }
  
  const query = `
    SELECT id, username, name, email, active, admin, 
           google_id, google_picture
    FROM u_user
    WHERE id = $1`
  
  const ruser = await conn.selectOne(query, [id], options)
  return ruser
}
```

### Google OAuth2 User

```javascript
export async function db_user_find_or_create_from_google(
  miolo, email, name, google_id, google_picture
) {
  const conn = miolo.db
  const options = { transaction: undefined }
  
  // Try to find existing user by google_id
  const query = `
    SELECT id, username, name, email, active, admin, 
           google_id, google_picture
    FROM u_user
    WHERE google_id = $1`
  
  const ruser = await conn.selectOne(query, [google_id], options)
  
  if (ruser?.id == undefined) {
    // Create new user
    const UUser = await conn.get_model('u_user')
    const data = {
      name,
      email,
      google_id,
      google_picture,
      active: 1
    }
    const uid = await UUser.insert(data, options)
    data.id = uid
    return [data, undefined]
  } else {
    return [ruser, undefined]
  }
}
```

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

## Database Trigger for Password Hashing

**File:** `src/server/db/triggers/user.mjs`

```javascript
import { sha512 } from '#server/utils/crypt.mjs'

async function beforeInsertUser(conn, params, options) {
  const raw_pwd = params?.password
  if (raw_pwd) {
    const cry_pwd = sha512(raw_pwd, process.env.MIOLO_SESSION_SALT)
    params.password = cry_pwd
  }
  return [params, options, true]
}

export default {
  before_insert: beforeInsertUser
}
```

## Session Configuration

**Important for OAuth2:** The session must use `sameSite: 'lax'` to work with Google redirects.

**In** `packages/miolo/src/config/defaults.mjs`:
```javascript
session: {
  options: {
    sameSite: 'lax',  // Required for OAuth2
    secure: false,     // Set true in production with HTTPS
    maxAge: 86400000,  // 24 hours
  }
}
```

## Best Practices

1. **Never store plain passwords** - Always hash with salt
2. **Use strong session salt** - Set `MIOLO_SESSION_SALT` in `.env`
3. **Don't return passwords** - User object should never include password field
4. **Validate on server** - Never trust client-side authentication
5. **Use HTTPS in production** - Protect credentials in transit
6. **Set secure cookies in production** - `MIOLO_SESSION_SECURE=true`
7. **Use sameSite=lax for OAuth2** - Required for external OAuth redirects
8. **Rate limit login attempts** - Prevent brute force attacks
9. **Log authentication events** - Track successful and failed logins

## Examples from miolo-sample

See actual implementations:
- `src/server/miolo/auth/passport.mjs` - Passport authentication config
- `src/server/db/io/users/auth.mjs` - User authentication queries
- `src/server/db/triggers/user.mjs` - Password hashing trigger
- `src/server/utils/crypt.mjs` - Hashing utilities
