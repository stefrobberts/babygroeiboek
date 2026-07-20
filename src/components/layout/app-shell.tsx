import { DesktopHeader } from "@/components/layout/desktop-header"
import { MobileHeader } from "@/components/layout/mobile-header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { Footer } from "@/components/layout/footer"
import { Container } from "@/components/shared/container"

interface AppShellProps {
  name: string
  email: string
  avatarUrl?: string | null
  children: React.ReactNode
}

export function AppShell({ name, email, avatarUrl, children }: AppShellProps) {
  return (
    <div className="bg-background flex min-h-dvh flex-col">
      <DesktopHeader name={name} email={email} avatarUrl={avatarUrl} />
      <MobileHeader name={name} email={email} avatarUrl={avatarUrl} />
      <main className="flex-1 pb-24 lg:pb-0">
        <Container size="wide" className="py-6 lg:py-10">
          {children}
        </Container>
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
