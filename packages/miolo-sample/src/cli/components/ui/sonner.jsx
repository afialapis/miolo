import React from "react"
import useThemeContext from "#cli/context/theme/useThemeContext.mjs"
import { Toaster as Sonner } from "sonner"

const Toaster = () => {
  const { theme } = useThemeContext()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="top-right"
      richColors={true}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)"
        }
      }/>
  );
}

export { Toaster }
