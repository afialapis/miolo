import React, {useEffect, useState } from "react"
import {THEME_STORAGE_KEY} from '#cli/config/store_keys.mjs'
import ThemeContext from './ThemeContext.mjs'

export default function ThemeProvider ({children, defaultTheme = "system"}) {
  const [theme, setTheme] = useState(
    () => (typeof localStorage !== 'undefined' ? (localStorage.getItem(THEME_STORAGE_KEY) || defaultTheme) : defaultTheme)
  )
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      setIsDark(systemTheme === "dark")
      return
    }

    root.classList.add(theme)
    setIsDark(theme === "dark")
  }, [theme])

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: (theme) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(THEME_STORAGE_KEY, theme)
        }
        setTheme(theme)
      },
      isDark,
      isLight: () => !isDark
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
