---
name: miolo-cli-router
description: Client-side routing patterns with react-router v7 for miolo applications. Use when implementing page navigation, route structure, or understanding the client-side routing hierarchy in miolo apps. For page data preloading with SSR, see miolo-ssr skill.
---

# Miolo Client-Side Routing

Client-side routing patterns using react-router v7 in miolo applications.

## Entry Points (DO NOT MODIFY)

Miolo manages routing through react-router v7 with two entry points that **should not be modified** except for very specific needs:

### Client Entry (BrowserRouter)

**File:** `src/cli/entry-cli.jsx`

```javascript
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { AppBrowser } from 'miolo-react'
import App from './App.jsx'

import '../static/style/globals.css'

const domNode = document.getElementById('root')

hydrateRoot(domNode, 
  <AppBrowser>
    <BrowserRouter>  
      <App/>
    </BrowserRouter>
  </AppBrowser>
)
```

**Do not modify** - This is the client-side hydration entry point.

### Server Entry (StaticRouter)

**File:** `src/server/miolo/ssr/entry-server.jsx`

Uses `StaticRouter` for server-side rendering. **Do not modify** except for specific SSR needs.

## Developer Starting Points

Developers build the application from these two main components:

### 1. App.jsx - Context Providers

**File:** `src/cli/App.jsx`

The root application component that sets up context providers:

```javascript
import React from 'react'
import { intre_locale_init } from 'intre'

import ThemeProvider from '#cli/context/theme/ThemeProvider.jsx'
import SessionProvider from '#cli/context/session/SessionProvider.jsx'
import UIProvider from '#cli/context/ui/UIProvider.jsx'
import DataProvider from '#cli/context/data/DataProvider.jsx'

import Index from '#cli/pages/Index.jsx'

intre_locale_init('es')

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UIProvider>
        <SessionProvider>
          <DataProvider>
            <Index/>
          </DataProvider>
        </SessionProvider>
      </UIProvider>
    </ThemeProvider>
  )
}

export default App
```

**Provider hierarchy** (outer to inner):
1. **ThemeProvider** - Dark/light theme management
2. **UIProvider** - UI state (sidebar, modals, etc.)
3. **SessionProvider** - Authentication and user session
4. **DataProvider** - Application data and API calls

**Key points:**
- Locale initialization with `intre_locale_init()`
- Predefined providers - can be modified or extended
- Renders `<Index/>` as the main routing component

### 2. Index.jsx - Main Router

**File:** `src/cli/pages/Index.jsx`

The main routing component that splits between authenticated and unauthenticated states:

```javascript
import React from 'react'
import useSessionContext from '#cli/context/session/useSessionContext.mjs'
import IndexOnline from '#cli/pages/IndexOnline.jsx'
import IndexOffline from '#cli/pages/IndexOffline.jsx'

export default function Index() {
  const { authenticated } = useSessionContext()

  if (!authenticated) {
    return <IndexOffline/>
  }

  return <IndexOnline/>
}
```

**Pattern:**
- Uses `SessionProvider` to check authentication
- Routes to `IndexOffline` for unauthenticated users
- Routes to `IndexOnline` for authenticated users
- Miolo handles session management by default

## Authenticated Routes (IndexOnline)

**File:** `src/cli/pages/IndexOnline.jsx`

Routes for authenticated users using react-router v7 with nested layout:

```javascript
import React from 'react'
import { Routes, Route } from 'react-router'
import MainLayout from '#cli/layout/main-layout.jsx'
import Dashboard from '#cli/pages/dash/Dashboard.jsx'
import Security from '#cli/pages/security/Security.jsx'

export default function IndexOnline() {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path={'security'} element={<Security/>}/>
        <Route path={'*'} element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}
```

**Key patterns:**
- **Layout route** - `MainLayout` as parent route element
- **Nested routes** - Child routes render inside layout's `<Outlet/>`
- **Index route** - Default child route for `/` path
- **Catch-all route** - `path={'*'}` redirects to Dashboard

**Layout component must use `<Outlet/>`:**
```javascript
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />  {/* Child routes render here */}
      </main>
    </div>
  )
}
```

## Unauthenticated Routes (IndexOffline)

**File:** `src/cli/pages/IndexOffline.jsx`

Routes for unauthenticated users:

```javascript
import React from 'react'
import { Routes, Route } from 'react-router'
import Login from '#cli/pages/offline/Login.jsx'

export default function IndexOffline() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}
```

**Key patterns:**
- No layout wrapper (full-page login/register)
- Index route shows Login
- Catch-all redirects to Login
- Minimal routes for auth flow

## Page Organization

Pages are organized in `src/cli/pages/` by feature/section:

```
src/cli/pages/
├── Index.jsx           # Main router (auth split)
├── IndexOnline.jsx     # Authenticated routes
├── IndexOffline.jsx    # Unauthenticated routes
├── dash/               # Dashboard pages
│   └── Dashboard.jsx
├── offline/            # Login/register pages
│   ├── Login.jsx
│   └── Register.jsx
├── security/           # User profile, security
│   └── Profile.jsx
└── todos/              # Feature-specific pages
    ├── TodosPage.jsx
    └── TodoDetail.jsx
```

## React Router v7 Patterns

### Basic Route

```javascript
<Route path="/todos" element={<TodosPage />} />
```

### Route with Parameters

```javascript
<Route path="/todo/:id" element={<TodoDetail />} />
```

Access params in component:
```javascript
import { useParams } from 'react-router'

function TodoDetail() {
  const { id } = useParams()
  return <div>Todo ID: {id}</div>
}
```

### Nested Routes

```javascript
<Route path="/todos" element={<TodosLayout />}>
  <Route index element={<TodosList />} />
  <Route path=":id" element={<TodoDetail />} />
  <Route path="new" element={<TodoCreate />} />
</Route>
```

Parent component needs `<Outlet>`:
```javascript
import { Outlet } from 'react-router'

function TodosLayout() {
  return (
    <div>
      <h1>Todos Section</h1>
      <Outlet /> {/* Child routes render here */}
    </div>
  )
}
```

### Programmatic Navigation

```javascript
import { useNavigate } from 'react-router'

function MyComponent() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/todos')
  }

  return <button onClick={handleClick}>Go to Todos</button>
}
```

### Link Component

```javascript
import { Link } from 'react-router'

function Navigation() {
  return (
    <nav>
      <Link to="/dash">Dashboard</Link>
      <Link to="/todos">Todos</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  )
}
```

## Adding a New Route

1. **Create page component** in `src/cli/pages/[feature]/`:
   ```javascript
   // pages/items/ItemsPage.jsx
   export default function ItemsPage() {
     return <div>Items Page</div>
   }
   ```

2. **Add route** to `IndexOnline.jsx`:
   ```javascript
   import ItemsPage from '#cli/pages/items/ItemsPage.jsx'
   
   <Route path="/items" element={<ItemsPage />} />
   ```

3. **Add navigation** in layout/sidebar:
   ```javascript
   <Link to="/items">Items</Link>
   ```

## Best Practices

1. **Don't modify entry points** - `entry-cli.jsx` should remain unchanged
2. **Use Index.jsx pattern** - Split authenticated/unauthenticated routes
3. **Organize by feature** - Group related pages in subdirectories
4. **Use layouts** - Wrap authenticated routes in `MainLayout`
5. **Handle 404s** - Always include catch-all route with `path="*"`
6. **Use import aliases** - Always use `#cli/` prefix for imports
7. **Programmatic navigation** - Use `useNavigate()` for dynamic navigation
8. **Protected routes** - Let `Index.jsx` handle auth, don't duplicate checks

## Common Patterns

### Redirect After Action

```javascript
function CreateTodo() {
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    await createTodo(data)
    navigate('/todos')  // Redirect after creation
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

### Conditional Rendering by Route

```javascript
import { useLocation } from 'react-router'

function Header() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dash'

  return (
    <header>
      {isDashboard && <DashboardActions />}
    </header>
  )
}
```

### Query Parameters

```javascript
import { useSearchParams } from 'react-router'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const query = searchParams.get('q')
  
  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery })
  }

  return <div>Search: {query}</div>
}
```

## Examples from miolo-sample

See actual implementations:
- `src/cli/entry-cli.jsx` - BrowserRouter entry point
- `src/cli/App.jsx` - Context providers hierarchy
- `src/cli/pages/Index.jsx` - Auth split routing
- `src/cli/pages/IndexOnline.jsx` - Authenticated routes
- `src/cli/pages/IndexOffline.jsx` - Unauthenticated routes
