import { intre_locale_init } from "intre"
import DataProvider from "#cli/context/data/DataProvider.jsx"
import SessionProvider from "#cli/context/session/SessionProvider.jsx"
import ThemeProvider from "#cli/context/theme/ThemeProvider.jsx"
import UIProvider from "#cli/context/ui/UIProvider.jsx"

import Index from "#cli/pages/Index.jsx"

intre_locale_init("es")

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UIProvider>
        <SessionProvider>
          <DataProvider>
            <Index />
          </DataProvider>
        </SessionProvider>
      </UIProvider>
    </ThemeProvider>
  )
}

export default App
