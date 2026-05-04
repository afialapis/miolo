const CACHE_NAME = "miolo-sample-cache-v1"

// 1. EVENTO INSTALL: Ocurre la primera vez que el usuario entra.
// Aquí cacheamos el "App Shell" (lo básico para que la app abra sin red).
self.addEventListener("install", (_event) => {
  /*console.log(`[miolo][sw] installing`)
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`[miolo][sw] installing - caching main`)
      // Rutas estáticas clave (ajusta según cómo sirva Miolo tus archivos)
      return cache.addAll([
        "/"
        // "/index.html",
        // "/icon-192x192.png"
        // Si sabes las URLs de tu JS/CSS, añádelas aquí.
      ])
    })
  )
  self.skipWaiting()*/
})

// 2. EVENTO ACTIVATE: Limpia cachés antiguas si cambias el CACHE_NAME
self.addEventListener("activate", (event) => {
  console.log(`[miolo][sw] activating`)
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const oldCaches = cacheNames.filter((name) => name !== CACHE_NAME)
      console.log(`[miolo][sw] activating - cleaning old caches ${oldCaches}`)
      return Promise.all(oldCaches.map((name) => caches.delete(name)))
    })
  )
  self.clients.claim()
})

// 3. EVENTO FETCH: El núcleo de tu estrategia
self.addEventListener("fetch", (_event) => {
  /*console.log(`[miolo][sw] fetching`)
  // ESTRATEGIA PARA LLAMADAS POST
  if (event.request.method === "POST" || event.request.method === "PUT") {
    event.respondWith(
      fetch(event.request).catch(() => {
        console.log(`[miolo][sw] fetching - fetch failed, returning 503 error`)
        // Si el fetch falla (porque no hay red), devolvemos un error controlado 503
        return new Response(
          JSON.stringify({ error: "Estás sin conexión. No se pueden guardar los cambios." }),
          {
            headers: { "Content-Type": "application/json" },
            status: 503,
            statusText: "Service Unavailable"
          }
        )
      })
    )
    return // Cortamos aquí para los POST
  }

  // ESTRATEGIA PARA LLAMADAS GET (Network First, fallback to Cache)
  // Intenta ir a internet siempre para tener los resultados frescos.
  // Si falla, tira de lo que tenga guardado en caché.
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        console.log(`[miolo][sw] fetching - fetch ok, caching it`)
        // Guardamos una copia en la caché para la próxima vez que se quede offline
        const responseClone = networkResponse.clone()
        caches.open(CACHE_NAME).then((cache) => {
          // No cacheamos extensiones raras del navegador
          if (event.request.url.startsWith("http")) {
            cache.put(event.request, responseClone)
          }
        })
        return networkResponse
      })
      .catch(() => {
        // Si no hay internet, devuelve la versión guardada en caché
        return caches.match(event.request)
      })
  )*/
})
