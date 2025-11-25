"use client"

import * as React from "react"
import {
  FileTextIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  MessageSquareIcon,
  SettingsIcon,
  MessageCircleIcon,
  UsersIcon,
  FileQuestion,
  TagIcon,
} from "lucide-react"
import Link from "next/link"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import useSWR from "swr"
import { createBrowserClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const data = {
  user: {
    name: "Loading...",
    email: "—",
    avatar: "",
  },
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Articles",
      url: "/dashboard/articles",
      icon: FileTextIcon,
    },
    {
      title: "Tags",
      url: "/dashboard/tags",
      icon: TagIcon,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: FolderIcon,
    },
    {
      title: "Services",
      url: "/dashboard/services",
      icon: ListIcon,
    },
    {
      title: "Testimonials",
      url: "/dashboard/testimonials",
      icon: MessageCircleIcon,
    },
    {
      title: "Team",
      url: "/dashboard/team",
      icon: UsersIcon,
    },
    {
      title: "FAQ",
      url: "/dashboard/faq",
      icon: FileQuestion,
    },
    {
      title: "Inquiries",
      url: "/dashboard/inquiries",
      icon: MessageSquareIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: SettingsIcon,
    },
  ],
}



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: inquiries } = useSWR('/api/inquiries', fetcher)
  const [user, setUser] = useState(data.user)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser()

      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', authUser.id)
          .single()

        if (profile) {
          setUser({
            name: profile.full_name || authUser.email?.split('@')[0] || '—',
            email: authUser.email || '—',
            avatar: profile.avatar || '',
          })
        }
      }
    }
    getUser()
  }, [])

  // Calculate unread inquiries
  const unreadCount = inquiries?.filter((i: any) => i.status === 'unread').length || 0

  // Update navMain with badge
  const navMainWithBadge = data.navMain.map(item => {
    if (item.title === "Inquiries" && unreadCount > 0) {
      return { ...item, badge: unreadCount }
    }
    return item
  })

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-zinc-950 text-zinc-400" {...props}>
      <SidebarHeader className="bg-zinc-950 text-zinc-50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="data-[state=open]:bg-zinc-800 data-[state=open]:text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-50 text-zinc-950">
                  <LayoutDashboardIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-heading font-bold">Kaizen</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-950 text-zinc-400">
        <NavMain items={navMainWithBadge} />
      </SidebarContent>
      <SidebarFooter className="bg-zinc-950 text-zinc-400">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
