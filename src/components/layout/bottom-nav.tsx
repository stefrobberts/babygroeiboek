"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Plus } from "lucide-react"

import { bottomNavItems } from "@/config/nav"
import { cn } from "@/lib/utils"
import { QuickAddSheet } from "@/components/layout/quick-add-sheet"
import { MoreMenuSheet } from "@/components/layout/more-menu-sheet"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="border-border bg-card/95 fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-2">
        {bottomNavItems.slice(0, 2).map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className="size-5.5"
                strokeWidth={isActive ? 2 : 1.5}
                aria-hidden="true"
              />
              {item.title}
            </Link>
          )
        })}

        <QuickAddSheet
          ariaLabel="Snel toevoegen"
          className="bg-primary text-primary-foreground shadow-primary/30 -mt-6 flex size-14 shrink-0 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95"
        >
          <Plus className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </QuickAddSheet>

        {bottomNavItems.slice(2, 3).map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-w-16 flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon
                className="size-5.5"
                strokeWidth={isActive ? 2 : 1.5}
                aria-hidden="true"
              />
              {item.title}
            </Link>
          )
        })}

        <MoreMenuSheet
          ariaLabel="Meer opties"
          className="text-muted-foreground hover:text-foreground flex min-w-16 flex-col items-center gap-1 rounded-2xl px-3 py-1.5 text-xs font-medium transition-colors"
        >
          <Menu className="size-5.5" strokeWidth={1.5} aria-hidden="true" />
          Meer
        </MoreMenuSheet>
      </div>
    </nav>
  )
}
