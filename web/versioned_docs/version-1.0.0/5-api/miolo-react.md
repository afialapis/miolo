---
sidebar_position: 3
---

# `miolo-react` (Client)

Este paquete provee los hooks y el ciclo de vida necesario para conectar el servidor SSR/WebSockets con la interfaz React del cliente.

> **Uso:** Importado exclusivamente en el entorno del navegador (`src/cli/`).

## Hooks Principales

### `useMioloContext()`
Retorna el estado global inyectado por el servidor, incluyendo:
- `user`: Datos de sesión del usuario.
- `authenticated`: Booleano del estado de sesión.
- `fetcher`: Un envoltorio Axios pre-configurado para interactuar con la API de tu app.
- `login(credentials)`: Función para hacer submit al endpoint local de login.
- `logout()`: Destruye la sesión actual.

### `useSsrData(key, defaultValue, remoteLoader)`
Maneja la hidratación SSR y el *fallback* asíncrono.
- Si el servidor inyectó datos con esa `key`, los usa instantáneamente.
- Si no, invoca el `remoteLoader` (async) usando el `fetcher`.
