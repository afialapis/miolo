---
name: miolo-react-patterns
description: React patterns and conventions for miolo client applications. Use when creating React components, contexts, hooks, pages, or organizing client-side code in miolo apps. For data loading with SSR, see miolo-ssr skill.
---

# Miolo React Patterns

React patterns and conventions for miolo client-side applications (src/cli/).

## Component Organization

Components are organized in `src/cli/` with fixed subdirectory structure:

```
src/cli/
├── components/        # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── [custom]/      # Custom components
├── context/           # React contexts
│   ├── data/          # Data context
│   ├── session/       # Session/auth context
│   ├── theme/         # Theme context
│   └── ui/            # UI state context
├── hooks/             # Custom React hooks
├── layout/            # Layout components
├── lib/               # Client utilities
└── pages/             # Page components
    ├── dash/          # Dashboard pages
    ├── offline/       # Unauthenticated pages
    └── [feature]/     # Feature-specific pages
```

## Context Pattern

Every context follows a three-file pattern:

```
context/feature/
├── FeatureContext.jsx     # Context definition
├── FeatureProvider.jsx    # Provider component
└── useFeatureContext.mjs  # Hook for consuming
```

### Context Definition

**File:** `context/session/SessionContext.mjs`

```javascript
import { createContext } from 'react'

const SessionContext = createContext()

export default SessionContext
```

### Provider Component

**File:** `context/session/SessionProvider.jsx`

```javascript
import { useState, useEffect } from 'react'
import SessionContext from './SessionContext.mjs'

export default function SessionProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch current user
    fetch('/api/user/current')
      .then(res => res.json())
      .then(data => {
        setUser(data.user)
        setLoading(false)
      })
  }, [])

  const login = async (credentials) => {
    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    const data = await res.json()
    if (data.ok) {
      setUser(data.user)
    }
    return data
  }

  const logout = async () => {
    await fetch('/api/user/logout', { method: 'POST' })
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}
```

### Consumer Hook

**File:** `context/session/useSessionContext.mjs`

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

### Usage in Components

```javascript
import useSessionContext from '#cli/context/session/useSessionContext.mjs'

export default function Profile() {
  const { user, loading, logout } = useSessionContext()

  if (loading) return <div>Loading...</div>
  if (!user) return <div>Not logged in</div>

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

## Custom Hooks Pattern

Custom hooks in `src/cli/hooks/`:

```javascript
// hooks/useStoragedState.mjs
import { useState, useEffect } from 'react'

export default function useStoragedState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

**Usage:**
```javascript
import useStoragedState from '#cli/hooks/useStoragedState.mjs'

function MyComponent() {
  const [settings, setSettings] = useStoragedState('user-settings', {})
  // ...
}
```

## Page Components

Pages in `src/cli/pages/` organized by feature:

```javascript
// pages/todos/Todos.jsx
import { useState } from 'react'
import useTodosContext from './context/useTodosContext.mjs'
import TodoList from './TodoList.jsx'
import TodoAdd from './TodoAdd.jsx'

export default function Todos() {
  const { todos, loading } = useTodosContext()

  if (loading) return <div>Loading todos...</div>

  return (
    <div>
      <h1>My Todos</h1>
      <TodoAdd />
      <TodoList todos={todos} />
    </div>
  )
}
```

## Component Best Practices

### Import Aliases

Always use import aliases:

```javascript
// ✅ CORRECT
import Component from '#cli/components/Component.jsx'
import useHook from '#cli/hooks/useHook.mjs'
import { fn } from '#cli/lib/utils.mjs'

// ❌ WRONG
import Component from '../../components/Component.jsx'
```

### Component File Extensions

- `.jsx` for files with JSX
- `.mjs` for pure JavaScript (hooks, utilities, context definitions)

### Prop Destructuring

```javascript
// ✅ CORRECT - Destructure in function signature
export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div>
      <span>{todo.description}</span>
      <button onClick={() => onToggle(todo.id)}>Toggle</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  )
}

// ❌ WRONG - Don't access props.x
export default function TodoItem(props) {
  return <div>{props.todo.description}</div>
}
```

### Loading and Error States

Always handle loading and error states:

```javascript
export default function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => {
        setData(json.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  return <div>{/* Render data */}</div>
}
```

## Layout Components

Layout components in `src/cli/layout/`:

```javascript
// layout/main-layout.jsx
import AppSidebar from './app-sidebar.jsx'
import { SidebarProvider } from '#cli/components/ui/sidebar.jsx'

export default function MainLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
```

## Data Fetching Pattern

Use contexts for shared data:

```javascript
// context/data/DataProvider.jsx
import { useState, useEffect } from 'react'
import DataContext from './DataContext.jsx'

export default function DataProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTodos = async () => {
    setLoading(true)
    const res = await fetch('/api/todo/list')
    const data = await res.json()
    setTodos(data.data)
    setLoading(false)
  }

  const addTodo = async (todo) => {
    const res = await fetch('/api/todo/upsave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    })
    const data = await res.json()
    if (data.ok) {
      await fetchTodos()  // Refresh list
    }
    return data
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const value = {
    todos,
    loading,
    fetchTodos,
    addTodo
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
```

## Styling with Tailwind

Use Tailwind utility classes:

```javascript
export default function Card({ title, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  )
}
```

## Form Handling

```javascript
export default function TodoForm({ onSubmit }) {
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!description.trim()) return
    
    await onSubmit({ description })
    setDescription('')  // Clear form
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add todo..."
        className="flex-1 px-4 py-2 border rounded"
      />
      <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  )
}
```

## Best Practices

1. **Use import aliases** - Always use `#cli/` prefix
2. **Follow the context pattern** - Three files per context
3. **Organize by feature** - Pages and components grouped by domain
4. **Handle loading states** - Always show loading/error UI
5. **Destructure props** - Don't use `props.x`
6. **Keep components small** - Single responsibility
7. **Use Tailwind** - Utility-first CSS
8. **Contexts for shared state** - Avoid prop drilling
9. **Custom hooks for reuse** - Extract reusable logic
10. **File extensions matter** - `.jsx` vs `.mjs`

## Examples from miolo-sample

See actual implementations:
- `src/cli/context/session/` - Session context pattern
- `src/cli/context/data/` - Data fetching context
- `src/cli/hooks/useStoragedState.mjs` - Custom hook
- `src/cli/pages/todos/` - Feature page organization
- `src/cli/layout/main-layout.jsx` - Layout component
