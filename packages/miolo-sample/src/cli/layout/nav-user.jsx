"use client"

import { ChevronsUpDown, LogOut, Moon, Shield, Sun } from "lucide-react"
import { useNavigate } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "#cli/components/ui/avatar.jsx"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "#cli/components/ui/dropdown-menu.jsx"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "#cli/components/ui/patched/sidebar.jsx"
import useSessionContext from "#cli/context/session/useSessionContext.mjs"
import useThemeContext from "#cli/context/theme/useThemeContext.mjs"

export function NavUser() {
  const { isMobile } = useSidebar()

  const { session, logout, authMethod } = useSessionContext()
  const navigate = useNavigate()
  const { isDark, setTheme } = useThemeContext()

  const twoLetters = session.name.slice(0, 2).toUpperCase()
  const avatarSrc = `/static/img/default/profile.png`

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={avatarSrc} alt={session.name} />
                <AvatarFallback className="rounded-lg">{twoLetters}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{session.name}</span>
                <span className="truncate text-xs">{session.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={avatarSrc} alt={session.name} />
                  <AvatarFallback className="rounded-lg">{twoLetters}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{session.name}</span>
                  <span className="truncate text-xs">{session.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {isDark ? (
              <DropdownMenuItem onSelect={() => setTheme("light")}>
                <Sun />
                Modo día
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={() => setTheme("dark")}>
                <Moon />
                Modo noche
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            {/*
            <DropdownMenuItem onSelect={() => navigate('/profile')}>
              <User/>
              Perfil
            </DropdownMenuItem>
            */}
            <DropdownMenuItem onSelect={() => navigate("/security")}>
              <Shield />
              Seguridad
            </DropdownMenuItem>
            {["local", "google", "basic"].includes(authMethod) && (
              <DropdownMenuItem onSelect={() => logout()}>
                <LogOut />
                Cerrar sesión
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
