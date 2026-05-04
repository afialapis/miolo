import { AppBrowser } from "miolo-react"
import { hydrateRoot } from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App.jsx"

import "../static/style/globals.css"

const domNode = document.getElementById("root")

hydrateRoot(
  domNode,
  <AppBrowser>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppBrowser>
)

// Comprobamos si el navegador del usuario soporta Service Workers
if ("serviceWorker" in navigator) {
  // Esperamos a que la página cargue completamente para no afectar el rendimiento inicial
  window.addEventListener("load", () => {
    // Apuntamos a la URL pública donde Miolo está sirviendo el archivo
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker registrado con éxito. Scope:", registration.scope)
      })
      .catch((error) => {
        console.error("Fallo al registrar el Service Worker:", error)
      })
  })
}
