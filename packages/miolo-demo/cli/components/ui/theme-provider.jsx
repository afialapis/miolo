import React, { createContext, useContext, useEffect, useState } from "react"


const ThemeProviderContext = createContext({theme: 'dark'})


export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => (typeof localStorage !== 'undefined' ? (localStorage.getItem(storageKey) || defaultTheme) : defaultTheme)
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

  const value = {
    theme,
    setTheme: (theme) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
    isDark,
    isLight: () => !isDark
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}