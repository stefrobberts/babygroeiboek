import { Camera, Heart } from "lucide-react"

import { SectionHeader } from "@/components/shared/section-header"
import { formatRelativeTime } from "@/utils/format"
import type { DashboardPhoto } from "@/features/dashboard/types"

const tileGradients = [
  "from-secondary/40 to-accent",
  "from-success/25 to-accent",
  "from-warning/25 to-accent",
  "from-primary/20 to-accent",
]

export function RecentPhotos({ photos }: { photos: DashboardPhoto[] }) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Recente foto's"
        description="De mooiste momenten van de afgelopen weken"
        href="/photos"
      />
      <div className="-mx-4 flex scrollbar-none gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className={`group relative aspect-square w-40 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br sm:w-auto ${tileGradients[index % tileGradients.length]}`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <Camera
                className="text-accent-foreground/40 size-8"
                strokeWidth={1.25}
                aria-hidden="true"
              />
            </div>
            {photo.isFavorite ? (
              <span className="bg-background/80 text-destructive absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full backdrop-blur-sm">
                <Heart
                  className="size-3.5"
                  fill="currentColor"
                  aria-hidden="true"
                />
              </span>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 space-y-0.5 bg-gradient-to-t from-black/55 to-transparent p-3">
              {photo.caption ? (
                <p className="truncate text-xs font-medium text-white">
                  {photo.caption}
                </p>
              ) : null}
              <p className="text-[0.7rem] text-white/80">
                {formatRelativeTime(photo.takenAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
