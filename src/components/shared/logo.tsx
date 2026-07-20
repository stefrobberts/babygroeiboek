import { cn } from "@/lib/utils"

interface LogoProps extends React.ComponentProps<"div"> {
  showWordmark?: boolean
}

export function Logo({ className, showWordmark = true, ...props }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)} {...props}>
      <span className="bg-primary text-primary-foreground flex size-9 shrink-0 items-center justify-center rounded-full">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-4.5"
          aria-hidden="true"
        >
          <path
            d="M12 21c-4.5-2.7-8-6.4-8-10.5A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 8 4.5c0 4.1-3.5 7.8-8 10.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showWordmark ? (
        <span className="font-heading text-foreground text-xl font-medium tracking-tight">
          Babygroeiboek
        </span>
      ) : null}
    </div>
  )
}
