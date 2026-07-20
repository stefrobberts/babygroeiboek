"use client"

import Link from "next/link"
import {
  Droplets,
  Milk,
  Moon,
  Camera,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"

const quickAddOptions = [
  { title: "Voeding", href: "/feeding", icon: Milk },
  { title: "Slaap", href: "/sleep", icon: Moon },
  { title: "Luier", href: "/diapers", icon: Droplets },
  { title: "Groei", href: "/growth", icon: TrendingUp },
  { title: "Foto", href: "/photos", icon: Camera },
  { title: "Mijlpaal", href: "/milestones", icon: Sparkles },
]

interface QuickAddSheetProps {
  children: React.ReactNode
  className?: string
  ariaLabel: string
}

export function QuickAddSheet({
  children,
  className,
  ariaLabel,
}: QuickAddSheetProps) {
  return (
    <Sheet>
      <SheetTrigger aria-label={ariaLabel} className={className}>
        {children}
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl pb-8">
        <SheetHeader className="items-center text-center">
          <SheetTitle className="text-lg">Snel toevoegen</SheetTitle>
          <SheetDescription>
            Wat wil je vastleggen voor je kindje?
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-3 gap-3 px-4">
          {quickAddOptions.map((option) => (
            <Link
              key={option.href}
              href={option.href}
              className="border-border bg-card hover:bg-accent flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-colors"
            >
              <span className="bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-full">
                <option.icon
                  className="size-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <span className="text-foreground text-sm font-medium">
                {option.title}
              </span>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
