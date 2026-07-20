import { Logo } from "@/components/shared/logo"
import { UserMenu } from "@/components/layout/user-menu"

interface MobileHeaderProps {
  name: string
  email: string
  avatarUrl?: string | null
}

export function MobileHeader({ name, email, avatarUrl }: MobileHeaderProps) {
  return (
    <header className="border-border bg-background/90 sticky top-0 z-30 flex items-center justify-between border-b px-4 py-3 backdrop-blur-sm lg:hidden">
      <Logo showWordmark={false} />
      <UserMenu name={name} email={email} avatarUrl={avatarUrl} />
    </header>
  )
}
