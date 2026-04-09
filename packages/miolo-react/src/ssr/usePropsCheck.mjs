import { useEffect, useRef } from "react"

export default function usePropsCheck(loader, effect, modifier) {
  const prevLoader = useRef(loader)
  const prevEffect = useRef(effect)
  const prevModifier = useRef(modifier)
  const loaderChangeCount = useRef(0)
  const effectChangeCount = useRef(0)
  const modifierChangeCount = useRef(0)
  const loaderChangeTime = useRef(0)
  const effectChangeTime = useRef(0)
  const modifierChangeTime = useRef(0)

  useEffect(() => {
    if (prevLoader.current !== undefined && prevLoader.current !== loader) {
      const now = Date.now()
      // Si el cambio ocurrió rápido (<100ms desde el último cambio), sumamos al contador continuo
      if (now - loaderChangeTime.current < 100) {
        loaderChangeCount.current += 1
        if (loaderChangeCount.current >= 4) {
          console.warn(
            "🚨 [miolo][useSsrDataOrReload]: 'options.loader' varies too frequently. Wrap it in a useCallback!"
          )
        }
      } else {
        // Ha pasado suficiente tiempo como para ser un cambio humano/aislado
        loaderChangeCount.current = 1
      }
      loaderChangeTime.current = now
    }
    prevLoader.current = loader
  }) // Evalúa en cada render

  useEffect(() => {
    if (prevEffect.current !== undefined && prevEffect.current !== effect) {
      const now = Date.now()
      if (now - effectChangeTime.current < 100) {
        effectChangeCount.current += 1
        if (effectChangeCount.current >= 4) {
          console.warn(
            "🚨 [miolo][useSsrDataOrReload]: 'options.effect' varies too frequently. Wrap it in a useMemo or useCallback!"
          )
        }
      } else {
        effectChangeCount.current = 1
      }
      effectChangeTime.current = now
    }
    prevEffect.current = effect
  }) // Evalúa en cada render

  useEffect(() => {
    if (prevModifier.current !== undefined && prevModifier.current !== modifier) {
      const now = Date.now()
      if (now - modifierChangeTime.current < 100) {
        modifierChangeCount.current += 1
        if (modifierChangeCount.current >= 4) {
          console.warn(
            "🚨 [miolo][useSsrDataOrReload]: 'options.modifier' varies too frequently. Wrap it in a useCallback!"
          )
        }
      } else {
        modifierChangeCount.current = 1
      }
      modifierChangeTime.current = now
    }
    prevModifier.current = modifier
  }) // Evalúa en cada render
}
