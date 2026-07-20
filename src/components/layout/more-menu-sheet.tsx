"use client"

import Link from "next/link"

import { trackingNavItems, memoryNavItems, utilityNavItems } from "@/config/nav"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

function NavGroup({
  title,
  items,
}: {
  title: string
  items: typeof trackingNavItems
}) {
  return (
    <div className="space-y-1.5 px-4">
      <p className="text-muted-foreground px-1 text-xs font-medium tracking-wide uppercase">
        {title}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border-border bg-card hover:bg-accent flex items-center gap-2.5 rounded-2xl border px-3 py-3 transition-colors"
          >
            <span className="bg-accent text-accent-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
              <item.icon
                className="size-4.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span className="text-foreground text-sm font-medium">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

interface MoreMenuSheetProps {
  children: React.ReactNode
  className?: string
  ariaLabel: string
}

export function MoreMenuSheet({
  children,
  className,
  ariaLabel,
}: MoreMenuSheetProps) {
  return (
    <Sheet>
      <SheetTrigger aria-label={ariaLabel} className={className}>
        {children}
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="max-h-[85vh] gap-5 overflow-y-auto rounded-t-3xl pb-8"
      >
        <SheetHeader>
          <SheetTitle className="text-lg">Alle onderdelen</SheetTitle>
        </SheetHeader>
        <NavGroup title="Bijhouden" items={trackingNavItems} />
        <NavGroup title="Herinneringen" items={memoryNavItems} />
        <NavGroup title="Gezin" items={utilityNavItems} />
      </SheetContent>
    </Sheet>
  )
}
