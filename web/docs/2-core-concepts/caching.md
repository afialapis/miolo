---
sidebar_position: 3
---

# Caché y Sincronización Realtime (Sockets)

Uno de los pilares de Miolo es la integración perfecta entre el renderizado desde el servidor (SSR), el cliente y la sincronización de datos en tiempo real mediante WebSockets.

## Invalidation mediante Sockets

En aplicaciones multiusuario, si el "Usuario A" modifica un dato (como completar una tarea), queremos que el "Usuario B" reciba ese cambio al instante sin tener que recargar la página. Para ello, utilizamos las funciones de invalidación.

Estas funciones se alojan en la capa `src/server/io/cache/` (que intercepta operaciones entre la BD y la API) y comienzan por `ch_`.

### Ejemplo de Invalidación Global

Cuando realizamos una modificación en el servidor, avisamos a la red global de WebSockets de que el modelo de datos "todos" ha caducado:

```javascript
// src/server/io/cache/todos/invalidate.mjs

export async function ch_todos_invalidate(ctx) {
  // El cliente utiliza useSsrData("todos", ...)
  // Notificamos que la clave "todos" debe refrescarse.
  await ctx.miolo.io.emitSsrRefresh(ctx, "todos", { 
    excludeCurrent: true 
  })
}
```

> [!TIP]
> **Patrón `excludeCurrent`**
> Es muy común enviar `excludeCurrent: true`. El "Usuario A" que generó la acción seguramente ya actualizó su pantalla de forma "optimista" a través de React al obtener la confirmación del guardado. Emitir el refresh al resto de usuarios conectados y *excluir al originador* ahorra llamadas HTTP innecesarias.

### Invalidación Privada (Peer-to-Peer)

En ocasiones, ocurre un evento de servidor (como la finalización de un proceso asíncrono o un pago) del que solo queremos notificar a un único usuario (el que originó o al que le pertenece).

```javascript
export async function ch_personal_stats_invalidate(ctx) {
  await ctx.miolo.io.emitSsrRefresh(ctx, "personal_stats", {
    onlyCurrent: true // Enviar el evento exclusivamente a este usuario
  })
}
```

## Lazy SSR Data Refresh (Refresco Perezoso)

Imagina un escenario en el que el "Usuario B" está haciendo scroll infinito y leyendo información detallada. De repente, el "Usuario A" crea un ítem nuevo. Si forzamos un refresco inmediato (Socket Invalidation clásico), la UI del "Usuario B" podría pegar un salto inesperado en la pantalla, arruinando su experiencia de usuario (Layout Shift).

Para solventarlo, Miolo incorpora el **Lazy Refresh**.

```javascript
await ctx.miolo.io.emitSsrRefresh(ctx, "todos", { 
  excludeCurrent: true,
  lazy: true  // <--- Refresco aplazado
})
```

### ¿Cómo funciona el flag `lazy`?

Al marcar `lazy: true`, el cliente React de Miolo registra internamente una "bandera" (flag) que avisa que los datos de la clave `"todos"` están desactualizados. 

Sin embargo, **no ejecuta ninguna llamada HTTP en ese momento**. El sistema esperará pacientemente hasta que ocurra un evento natural y no disruptivo en la UI (como que el usuario haga una navegación en el router, o que cambie de pestaña y vuelva a centrar el foco de la ventana) para ejecutar silenciosamente la obtención de los nuevos datos.
