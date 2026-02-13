---
name: miolo-ssr
description: Server-Side Rendering (SSR) patterns for miolo applications. Use when implementing data preloading on the server, configuring SSR loader, or using useSsrData hook for client-side hydration and remote data loading.
---

# Miolo Server-Side Rendering (SSR)

Server-side data preloading and client-side hydration patterns for miolo applications.

## Backend - SSR Loader

The SSR loader preloads data on the server before sending the initial HTML to the client.

### Loader Configuration

**File:** `src/server/miolo/ssr/loader.mjs`

```javascript
import { db_todo_read } from '#server/db/io/todos/read.mjs'
import { db_user_profile } from '#server/db/io/users/read.mjs'

const loader = async (ctx) => {
  let todos = []
  let profile = null
  
  try {
    // Load data using database functions
    todos = await db_todo_read(ctx, {})
    todos = todos.sort((a, b) => b.created_at - a.created_at)
  } catch (_) {}
  
  try {
    if (ctx.session.user) {
      profile = await db_user_profile(ctx, { id: ctx.session.user.id })
    }
  } catch (_) {}
  
  // Return object with data
  // Keys are important - they're used in client code
  const data = {
    todos,      // Accessible as 'todos' in client
    profile     // Accessible as 'profile' in client
  }

  return data
}

export { loader }
```

**Key points:**
- Export async function named `loader`
- Receives `ctx` with session and request data
- Returns object with data to preload
- **Object keys are important** - used as `<key>` in client `useSsrData()`
- Wrap in try/catch to handle errors gracefully

### URL-Based Loading

Filter data based on current URL:

```javascript
const loader = async (ctx) => {
  const url = ctx.request.url
  
  let data = {}
  
  // Load different data based on route
  if (url.startsWith('/dashboard')) {
    try {
      data.stats = await db_dashboard_stats(ctx)
      data.recent = await db_recent_activity(ctx)
    } catch (_) {}
  } else if (url.startsWith('/profile')) {
    try {
      data.profile = await db_user_profile(ctx, { id: ctx.session.user.id })
      data.settings = await db_user_settings(ctx, { id: ctx.session.user.id })
    } catch (_) {}
  }
  
  return data
}
```

**Access URL:**
- `ctx.request.url` - Current request URL
- Load only the data needed for the current page
- Reduces payload size and improves performance

### User-Specific Loading

Load different data based on authentication:

```javascript
const loader = async (ctx) => {
  let data = {
    publicData: []
  }
  
  // Always load public data
  try {
    data.publicData = await db_public_items(ctx)
  } catch (_) {}
  
  // Load user-specific data if authenticated
  if (ctx.session.authenticated) {
    try {
      data.userItems = await db_user_items(ctx, { 
        user_id: ctx.session.user.id 
      })
      data.notifications = await db_user_notifications(ctx, {
        user_id: ctx.session.user.id
      })
    } catch (_) {}
  }
  
  return data
}
```

## Client-Side - useSsrData Hook

The `useSsrData` hook manages SSR-preloaded data and provides remote loading fallback.

### Hook Signature

```javascript
const [data, setData, refreshData] = useSsrData(
  '<key>',           // Key from SSR loader object
  defaultValue,      // Default value if no data
  async (context, fetcher) => {  // Remote loader (fallback)
    // Load data from API if not in SSR
    const response = await fetcher.get('/api/data')
    return processData(response.data)
  }
)
```

**Parameters:**
1. **`<key>`** (string) - Key name from SSR loader object
2. **`defaultValue`** (any) - Default value when no data available
3. **`remoteLoader`** (async function) - Fallback function to load data remotely

**Returns:** `[data, setData, refreshData]`
- **`data`** - Current data (React state)
- **`setData`** - Function to set data directly (like setState)
- **`refreshData`** - Function to re-execute remote loader

### Access useSsrData

Available from two sources:

**1. From useMioloContext:**
```javascript
import { useMioloContext } from 'miolo-react'

function MyComponent() {
  const { useSsrData } = useMioloContext()
  
  const [todos, setTodos, refreshTodos] = useSsrData('todos', [], async (context, fetcher) => {
    const { data } = await fetcher.get('/api/todo/list')
    return data
  })
  
  return <div>{todos.length} todos</div>
}
```

**2. From useSessionContext:**
```javascript
import useSessionContext from '#cli/context/session/useSessionContext.mjs'

function MyComponent() {
  const { useSsrData } = useSessionContext()
  
  const [profile, setProfile, refreshProfile] = useSsrData('profile', null, async (context, fetcher) => {
    const { data } = await fetcher.get('/api/user/profile')
    return data
  })
  
  return <div>{profile?.name}</div>
}
```

### Basic Usage Example

**DataProvider using useSsrData:**

```javascript
import React, { useState } from 'react'
import useSessionContext from '#cli/context/session/useSessionContext.mjs'
import TodoList from '#ns/models/TodoList.mjs'
import DataContext from './DataContext.jsx'

const DataProvider = ({ children }) => {
  const [status, setStatus] = useState('loaded')
  const { useSsrData } = useSessionContext()

  const [todos, _setTodos, refreshTodos] = useSsrData('todos', [], async (context, fetcher) => {
    setStatus('loading')
    const { data: nTodos } = await fetcher.get('/api/todo/list')
    setStatus('loaded')
    return new TodoList(nTodos)
  })
  
  return (
    <DataContext.Provider value={{
      todos,
      refreshTodos,
      loading: status !== 'loaded',
      loaded: status === 'loaded'
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider
```

**How it works:**
1. **SSR hit** - Miolo finds `'todos'` in SSR loader, uses that data
2. **SSR miss** - Key not found in SSR, executes remote loader
3. **Client refresh** - Calling `refreshTodos()` re-executes remote loader

### Remote Loader Function

The third parameter to `useSsrData` is only executed when:
- Data is not available in SSR loader (no matching key)
- User calls `refreshData()` to reload

```javascript
const [items, setItems, refreshItems] = useSsrData(
  'items',
  [],
  async (context, fetcher) => {
    // This runs ONLY if:
    // 1. SSR loader didn't provide 'items' data
    // 2. User calls refreshItems()
    
    const { data } = await fetcher.get('/api/items/list')
    
    // Can transform data before returning
    return data.map(item => new ItemModel(item))
  }
)
```

**Remote loader parameters:**
- **`context`** - Application context
- **`fetcher`** - Authenticated fetch wrapper (see miolo-fetcher skill)

### Setting Data Manually

Use `setData` to update state directly:

```javascript
const [todos, setTodos, refreshTodos] = useSsrData('todos', [], remoteLoader)

const handleAddTodo = async (newTodo) => {
  // Optimistic update
  setTodos([...todos, newTodo])
  
  // Save to backend
  const response = await fetcher.post('/api/todo/save', newTodo)
  
  if (!response.ok) {
    // Rollback on error
    await refreshTodos()
  }
}
```

### Refreshing Data

Call `refreshData` to re-execute the remote loader:

```javascript
const [notifications, setNotifications, refreshNotifications] = useSsrData(
  'notifications',
  [],
  async (context, fetcher) => {
    const { data } = await fetcher.get('/api/notifications')
    return data
  }
)

// Manually refresh
const handleRefresh = () => {
  refreshNotifications()  // Re-executes remote loader
}

// Auto-refresh every 30 seconds
useEffect(() => {
  const interval = setInterval(refreshNotifications, 30000)
  return () => clearInterval(interval)
}, [])
```

### Complex Data Transformations

Transform data in remote loader:

```javascript
import TodoList from '#ns/models/TodoList.mjs'

const [todos, setTodos, refreshTodos] = useSsrData(
  'todos',
  new TodoList([]),
  async (context, fetcher) => {
    const { data: rawTodos } = await fetcher.get('/api/todo/list')
    
    // Transform to model class
    const todoList = new TodoList(rawTodos)
    
    // Apply filters
    todoList.filterByStatus('active')
    
    // Sort
    todoList.sortByDate('desc')
    
    return todoList
  }
)
```

### Multiple Data Sources

Load multiple independent data sources:

```javascript
const DataProvider = ({ children }) => {
  const { useSsrData } = useSessionContext()

  const [todos, setTodos, refreshTodos] = useSsrData('todos', [], loadTodos)
  const [profile, setProfile, refreshProfile] = useSsrData('profile', null, loadProfile)
  const [stats, setStats, refreshStats] = useSsrData('stats', {}, loadStats)
  
  return (
    <DataContext.Provider value={{
      todos, refreshTodos,
      profile, refreshProfile,
      stats, refreshStats
    }}>
      {children}
    </DataContext.Provider>
  )
}
```

## Best Practices

### Backend (SSR Loader)

1. **Wrap in try/catch** - Always handle errors gracefully, don't crash SSR
2. **Return default values** - Provide sensible defaults (empty arrays, null, etc.)
3. **Use meaningful keys** - Choose clear, descriptive names for data keys
4. **Load only needed data** - Filter by URL to reduce payload size
5. **Check authentication** - Load user-specific data only if authenticated
6. **Keep it fast** - SSR loader blocks initial render, optimize queries

### Client (useSsrData)

1. **Provide default values** - Always specify sensible defaults
2. **Transform in remote loader** - Process data before returning
3. **Handle loading states** - Track loading status in remote loader
4. **Use setData for optimistic updates** - Update UI immediately, sync later
5. **Refresh on mutations** - Call refreshData after creating/updating data
6. **Don't over-refresh** - Only refresh when data might have changed

## Common Patterns

### Loading State Management

```javascript
const DataProvider = ({ children }) => {
  const [status, setStatus] = useState('loaded')
  const { useSsrData } = useSessionContext()

  const [data, setData, refreshData] = useSsrData('data', [], async (context, fetcher) => {
    setStatus('loading')
    try {
      const response = await fetcher.get('/api/data')
      setStatus('loaded')
      return response.data
    } catch (error) {
      setStatus('error')
      return []
    }
  })
  
  return (
    <DataContext.Provider value={{
      data,
      refreshData,
      loading: status === 'loading',
      loaded: status === 'loaded',
      error: status === 'error'
    }}>
      {children}
    </DataContext.Provider>
  )
}
```

### Conditional Loading

```javascript
const loader = async (ctx) => {
  const data = {}
  
  // Only load heavy data for specific routes
  if (ctx.request.url.includes('/admin')) {
    try {
      data.adminStats = await db_admin_stats(ctx)
    } catch (_) {}
  }
  
  return data
}
```

## Related Skills

- **miolo-session-context** - Access `useSsrData` from session context
- **miolo-fetcher** - Fetcher usage in remote loaders (future skill)
- **miolo-react-patterns** - Context provider patterns

## Examples from miolo-sample

See actual implementations:
- `src/server/miolo/ssr/loader.mjs` - SSR loader configuration
- `src/cli/context/data/DataProvider.jsx` - useSsrData usage
