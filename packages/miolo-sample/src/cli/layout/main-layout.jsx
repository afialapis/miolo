import React, {Fragment} from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from '#cli/components/ui/sonner.jsx'
import { AppSidebar } from "#cli/layout/app-sidebar.jsx"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "#cli/components/ui/breadcrumb.jsx"
import { Separator } from "#cli/components/ui/separator.jsx"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "#cli/components/ui/patched/sidebar.jsx"
import { Spinner } from '#cli/components/shadcn-io/spinner/index.jsx'
import useDataContext from '#cli/context/data/useDataContext.mjs'

export default function MainLayout() {
  const {breads, loading} = useDataContext()

  const hasBreads = breads.length > 0
  const firstBreads = breads.length > 1 ? breads.slice(0, -1) : []
  const lastBread = hasBreads ? breads[breads.length - 1] : []
  
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {hasBreads && (
            <Breadcrumb>
              <BreadcrumbList>
                {firstBreads.map((bread, index) => {
                  return (
                    <Fragment key={`bread_${index}`}>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href={bread[0]}>{bread[1]}</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                    </Fragment>
                  )
                })}
                <BreadcrumbItem>
                  <BreadcrumbPage>{lastBread.length > 1 ? lastBread[1] : lastBread[0]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </header>
        {loading
          ? <Spinner/>
          : <Outlet/>
        }
        <Toaster/>
      </SidebarInset>
    </SidebarProvider>
  )
}
