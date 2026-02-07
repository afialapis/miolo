"use client"
import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "#cli/components/ui/patched/sidebar.jsx"

import { NavMain } from "./nav-main.jsx"
import { NavLastTodos } from "./nav-last-todos.jsx"
import { NavUser } from "./nav-user.jsx"


export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <NavLastTodos/>
        <NavMain/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
