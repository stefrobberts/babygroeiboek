import Image from "next/image"
import { Baby } from "lucide-react"

import { cn } from "@/lib/utils"

interface BabyAvatarProps extends React.ComponentProps<"div"> {
  photoUrl?: string | null
  name: string
  size?: "sm" | "md" | "lg" | "xl"
}

const sizeClasses: Record<NonNullable<BabyAvatarProps["size"]>, string> = {
  sm: "size-10",
  md: "size-14",
  lg: "size-20",
  xl: "size-28",
}

const iconSizeClasses: Record<NonNullable<BabyAvatarProps["size"]>, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-11",
}

export function BabyAvatar({
  photoUrl,
  name,
  size = "md",
  className,
  ...props
}: BabyAvatarProps) {
  return (
    <div
      className={cn(
        "border-border from-secondary/30 to-accent relative shrink-0 overflow-hidden rounded-full border bg-gradient-to-br",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={name}
          fill
          sizes="112px"
          className="object-cover"
        />
      ) : (
        <div className="text-accent-foreground/70 flex h-full w-full items-center justify-center">
          <Baby
            className={iconSizeClasses[size]}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  )
}
