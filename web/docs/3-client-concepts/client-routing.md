---
sidebar_position: 1
---

# Enrutamiento en el Cliente (React Router)

Miolo utiliza de forma nativa **React Router v7** para gestionar la navegación en el cliente (SPA) y el Server-Side Rendering de manera integrada.

## Puntos de Entrada (Entry Points)

La aplicación cliente de Miolo cuenta con dos puntos de entrada principales gestionados por el framework:
- `src/cli/entry-cli.jsx`: Punto de entrada para el navegador (utiliza `BrowserRouter` y la hidratación de React 18).
- `src/server/miolo/ssr/entry-server.jsx`: Punto de entrada para el servidor (utiliza `StaticRouter` para el SSR).

> [!WARNING]
> **No modifiques estos archivos** a menos que tengas necesidades extremadamente específicas y avanzadas relacionadas con el proceso de *hydrate* o de SSR. 

## El Enrutador Principal (`Index.jsx`)

El verdadero punto de partida para el desarrollo es `src/cli/pages/Index.jsx`. Miolo emplea un patrón de bifurcación de rutas (Auth Split) para separar físicamente lo que un usuario anónimo puede ver frente a un usuario autenticado.

```javascript
import React from 'react'
import useSessionContext from '#cli/context/session/useSessionContext.mjs'
import IndexOnline from '#cli/pages/IndexOnline.jsx'
import IndexOffline from '#cli/pages/IndexOffline.jsx'

export default function Index() {
  const { authenticated } = useSessionContext()

  // Bifurcación basada en el estado de autenticación
  if (!authenticated) {
    return <IndexOffline/>
  }

  return <IndexOnline/>
}
```

## Rutas Autenticadas (`IndexOnline.jsx`)

Es donde pasará la mayor parte de la aplicación. Se estructuran utilizando Layouts anidados.

```javascript
import React from 'react'
import { Routes, Route } from 'react-router'
import MainLayout from '#cli/layout/main-layout.jsx'
import Dashboard from '#cli/pages/dash/Dashboard.jsx'

export default function IndexOnline() {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path={'security'} element={<Security/>}/>
        
        {/* Catch-all para rutas no encontradas dentro de la sesión */}
        <Route path={'*'} element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}
```

### Layouts y `<Outlet/>`

El componente `MainLayout` actúa como "envoltorio" de las rutas hijas. Para que las páginas anidadas se rendericen (como `Dashboard` o `Security`), el layout **debe** incluir el componente `<Outlet />` de react-router.

```javascript
import { Outlet } from 'react-router'

function MainLayout() {
  return (
    <div>
      <Sidebar />
      <main>
        <Outlet />  {/* Aquí se inyectarán las páginas hijas */}
      </main>
    </div>
  )
}
```

## Rutas Públicas (`IndexOffline.jsx`)

Destinadas a procesos de autenticación, recuperación de contraseñas, o *landing pages*.

```javascript
import React from 'react'
import { Routes, Route } from 'react-router'
import Login from '#cli/pages/offline/Login.jsx'

export default function IndexOffline() {
  return (
    <Routes>
      {/* Sin Layout, vista a pantalla completa */}
      <Route index element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}
```

## Navegación Dinámica

Para navegar entre vistas o ejecutar redirecciones después de enviar formularios, utiliza los hooks nativos de React Router:

```javascript
import { useNavigate } from 'react-router'

function CreateTodo() {
  const navigate = useNavigate()

  const handleSubmit = async (data) => {
    await createTodo(data)
    navigate('/todos')  // Redirección exitosa
  }
}
```

Para crear enlaces en la UI (menús de navegación, listas, etc), utiliza siempre el componente `<Link>` en lugar de la etiqueta estándar `<a>` para evitar la recarga completa del navegador.

```javascript
import { Link } from 'react-router'

<Link to="/profile">Ver mi perfil</Link>
```
