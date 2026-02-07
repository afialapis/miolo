"use client"

import React from "react"
import { useLocation } from "react-router-dom"
import { ChevronsUpDown, Cable, House } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  //DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "#cli/components/ui/dropdown-menu.jsx"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "#cli/components/ui/patched/sidebar.jsx"
import useDataContext from "#cli/context/data/useDataContext.mjs"

export function PropSwitcher() {
  const { isMobile } = useSidebar()
  const location = useLocation()

  const {properties} = useDataContext()
  const [activeProp, setActiveProp] = React.useState(properties[0])

  // TODO CHeck w
  if (location.pathname == '/connect') {
    return null
  }

  if (!activeProp) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <House className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeProp.name}</span>
                {/*<span className="truncate text-xs">{activeProp.plan}</span>*/}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Propiedades
            </DropdownMenuLabel>
            {properties.map((prop, _index) => (
              <DropdownMenuItem
                key={prop.name}
                onClick={() => setActiveProp(prop)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <House className="size-3.5 shrink-0" />
                </div>
                {prop.name}
                {/*<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>*/}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Cable className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Conectar propiedad</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
