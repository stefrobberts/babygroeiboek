"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { mainNavItem, trackingNavItems, memoryNavItems } from "@/config/nav"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/shared/logo"
import { UserMenu } from "@/components/layout/user-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DesktopHeaderProps {
  name: string
  email: string
  avatarUrl?: string | null
}

function NavLink({ href, title }: { href: string; title: string }) {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
      )}
    >
      {title}
    </Link>
  )
}

export function DesktopHeader({ name, email, avatarUrl }: DesktopHeaderProps) {
  const pathname = usePathname()
  const isTrackingActive = trackingNavItems.some((item) =>
    pathname.startsWith(item.href)
  )

  return (
    <header className="border-border bg-background/90 sticky top-0 z-30 hidden border-b backdrop-blur-sm lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
        <div className="flex items-center gap-8">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <nav className="flex items-center gap-1" aria-label="Hoofdnavigatie">
            <NavLink href={mainNavItem.href} title={mainNavItem.title} />

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors outline-none",
                  isTrackingActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                Bijhouden
                <ChevronDown className="size-3.5" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {trackingNavItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    render={<Link href={item.href} />}
                  >
                    <item.icon className="size-4" />
                    {item.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {memoryNavItems.slice(0, 4).map((item) => (
              <NavLink key={item.href} href={item.href} title={item.title} />
            ))}
          </nav>
        </div>
        <UserMenu name={name} email={email} avatarUrl={avatarUrl} />
      </div>
    </header>
  )
}
