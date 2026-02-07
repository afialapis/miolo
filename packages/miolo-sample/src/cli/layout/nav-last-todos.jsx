"use client"
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, HousePlug, Route, RouteOff, Cable, ChartSpline } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "#cli/components/ui/collapsible.jsx"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "#cli/components/ui/patched/sidebar.jsx"
import useDataContext from '#cli/context/data/useDataContext.mjs'

export function NavLastTodos() {
  const {todos} = useDataContext()

  const lastTodos = useMemo(() => {
    return todos
      .sort((a, b) => b.created_at - a.created_at)
      .slice(0, 5)
  }, [todos])
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Resumen</SidebarGroupLabel>
      <SidebarMenu>

      <SidebarMenuItem>
        <SidebarMenuButton tooltip={'Inicio'}>
          <ChartSpline/>
          <Link to="/">Inicio</Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      {(lastTodos.length==0)
       ? null
       : 
        <Collapsible
          key={'Conectadas'}
          asChild
          defaultOpen={true}
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={'Últimos todos'}>
                <HousePlug/>
                <span>Últimos todos</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {lastTodos.map((todo) => (
                  <SidebarMenuSubItem key={todo.description}>
                    <SidebarMenuSubButton asChild>
                      <Link to={`/`}>
                        {todo.done ? <RouteOff color="red"/> : <Route color="green"/>}
                        <span>{todo.description}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
        }

        <SidebarMenuItem>
          <SidebarMenuButton tooltip={'Yay!'}>
            <Cable/>
            <Link to="/">Yay!</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarGroup>
  )
}
