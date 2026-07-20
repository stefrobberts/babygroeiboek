import { Container } from "@/components/shared/container"
import { siteConfig } from "@/config/site"

export function Footer() {
  return (
    <footer className="border-border hidden border-t py-8 lg:block">
      <Container size="wide" className="text-muted-foreground text-sm">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.fullName}. Met liefde
          gemaakt voor jonge gezinnen.
        </p>
      </Container>
    </footer>
  )
}
