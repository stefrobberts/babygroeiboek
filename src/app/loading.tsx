export default function RootLoading() {
  return (
    <div className="bg-background flex min-h-dvh items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="bg-primary/10 flex size-12 items-center justify-center rounded-full">
          <span className="border-primary size-6 animate-spin rounded-full border-2 border-t-transparent" />
        </span>
        <p className="text-muted-foreground text-sm">Een moment geduld...</p>
      </div>
    </div>
  )
}
