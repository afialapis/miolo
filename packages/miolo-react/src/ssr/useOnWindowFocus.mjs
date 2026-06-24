import { useEffect, useRef } from "react"

export default function useOnWindowFocus(callback) {
  // Usamos un ref para guardar el callback más reciente
  // Esto evita problemas de re-renderizados si el callback cambia
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handleFocus = () => {
      // document.hidden es parte de la Page Visibility API
      // Solo ejecutamos el callback si la pestaña realmente está visible
      if (!document.hidden && callbackRef.current) {
        callbackRef.current()
      }
    }

    // Escuchamos cuando la pestaña se vuelve visible (Page Visibility API)
    document.addEventListener("visibilitychange", handleFocus)

    // Escuchamos cuando la ventana recupera el foco (Fallback)
    window.addEventListener("focus", handleFocus)

    // Limpieza de eventos al desmontar
    return () => {
      document.removeEventListener("visibilitychange", handleFocus)
      window.removeEventListener("focus", handleFocus)
    }
  }, [])
}
