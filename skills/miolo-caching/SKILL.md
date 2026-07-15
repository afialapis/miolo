---
name: miolo-caching
description: Advanced data caching and synchronization patterns for miolo applications. Use when handling useSsrData(), real-time data invalidation via WebSockets, or preventing abrupt UI re-renders using lazy refresh patterns.
---

# Miolo Caching & Sockets

This skill covers how to efficiently cache data on the client using `useSsrData()`, keep it in sync across multiple clients via WebSockets, and ensure smooth UI experiences.

## The `useSsrData()` Cache

`useSsrData` handles both Server-Side Rendering (SSR) preloading and client-side data fetching. However, its true power comes from its caching capabilities and how it integrates with global application events.

### Basic Invalidation

When data changes on the server (e.g., a user adds a new Todo), you typically need to refresh the client's cache. 

```javascript
const [todos, setTodos, refreshTodos] = useSsrData('todos', [], loadTodos)

// After a mutation:
const handleAdd = async (newTodo) => {
  await fetcher.post('/api/todos', newTodo)
  // Manually refresh local data
  refreshTodos() 
}
```

## WebSocket Synchronization

In multi-user apps, when User A updates a Todo, User B needs to see the change. Miolo uses WebSockets to broadcast invalidation messages.

### The `exclude_socket_id` Pattern

When User A makes a mutation, they generally update their UI optimistically or refresh their own data immediately. If the server broadcasts a blanket `refresh` to *everyone*, User A will suffer a redundant data fetch.

**Server-side:**
```javascript
// Example: src/server/io/cache/todos/invalidate.mjs

export async function ch_todos_invalidate(ctx) {
  // A mutation happened. Inform the socket layer.
  // The cache key "todos" matches the key used in the client's useSsrData("todos", ...)
  await ctx.miolo.io.emitSsrRefresh(ctx, "todos", { 
    excludeCurrent: true // Ignore the user who caused the change!
  })
}
```

**Client-side:**
When the socket receives the invalidation, Miolo's core triggers a re-fetch for any `useSsrData` listening to the updated keys, keeping User B in sync seamlessly.

### The `only_socket_id` Pattern

Sometimes, an operation is localized or private. The server can push data updates specifically to a single connected client.

**Server-side:**
```javascript
// Example: src/server/io/cache/stats/invalidate.mjs

export async function ch_personal_stats_invalidate(ctx) {
  await ctx.miolo.io.emitSsrRefresh(ctx, "personal_stats", {
    onlyCurrent: true // Push update specifically to the originating client
  })
}
```

## Lazy SSR Data Refresh (`ssr-lazy-refresh`)

A common UX problem with real-time sockets is "Abrupt UI Re-renders". If User B is actively reading a list and User A edits an item, a forced websocket refresh might cause User B's screen to jump or lose scroll state unexpectedly.

To solve this, use the **lazy refresh** pattern:

1. **Trigger `ssr-lazy-refresh`:** Instead of an immediate forced refresh, the server passes `lazy: true`.
   ```javascript
   await ctx.miolo.io.emitSsrRefresh(ctx, "todos", { 
     excludeCurrent: true,
     lazy: true 
   })
   ```
2. **Wait for Interaction:** The data refresh is delayed until the user navigates, focuses the window, or explicitly triggers an action (handled by `miolo-navigation` and window focus listeners).
3. **Implementation:** Miolo marks the internal `pendingLazyRefreshRef` flag. When the UX is safe (e.g., natural navigation boundary), it refreshes without causing jarring layout shifts.

### Best Practices

- **Avoid Blanket Broadcasts:** Always provide `excludeCurrent: true` in your server mutations when the originating client already handled its local state optimistically.
- **Respect User Focus:** Use lazy refreshing for heavy or layout-shifting data updates. 
- **Graceful Degradation:** The cache should always fall back to `remoteLoader` if the socket disconnects.
