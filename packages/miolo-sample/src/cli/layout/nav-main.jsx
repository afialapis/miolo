"use client"
import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownUp, Braces } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "#cli/components/ui/patched/sidebar.jsx"
// import useSessionContext from '#cli/context/session/useSessionContext.mjs'


export function NavMain() {

  // const {permiss} = useSessionContext()
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Configuración</SidebarGroupLabel>
      <SidebarMenu>
      
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={'Red'}>
            <ArrowDownUp/>
            <Link to="/">Foo</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/*permiss.can_user_debug() && (*/}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={'Dev'}>
              <Braces/>
              <Link to="/dev">Bar</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
       {/*)*/}

      </SidebarMenu>
    </SidebarGroup>
  )
}
