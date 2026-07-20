import type { Metadata } from "next"

import { createClient } from "@/lib/supabase/server"
import { getDashboardData } from "@/features/dashboard/lib/get-dashboard-data"
import { WelcomeHeader } from "@/features/dashboard/components/welcome-header"
import { QuickStats } from "@/features/dashboard/components/quick-stats"
import { AiTipCard } from "@/features/dashboard/components/ai-tip-card"
import { QuickActions } from "@/features/dashboard/components/quick-actions"
import { RecentPhotos } from "@/features/dashboard/components/recent-photos"
import { TimelinePreview } from "@/features/dashboard/components/timeline-preview"
import { FadeIn } from "@/components/shared/fade-in"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = user
    ? await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single()
    : { data: null }

  const parentName = profile?.full_name ?? user?.email?.split("@")[0] ?? "daar"
  const data = await getDashboardData()

  return (
    <div className="space-y-8">
      <FadeIn>
        <WelcomeHeader
          parentName={parentName}
          baby={data.baby}
          nextMilestone={data.nextMilestone}
        />
      </FadeIn>
      <FadeIn delay={0.05}>
        <QuickStats
          lastFeed={data.lastFeed}
          lastSleep={data.lastSleep}
          lastDiaper={data.lastDiaper}
        />
      </FadeIn>
      <FadeIn delay={0.1}>
        <AiTipCard tip={data.aiTip} />
      </FadeIn>
      <FadeIn delay={0.15}>
        <QuickActions />
      </FadeIn>
      <FadeIn delay={0.2}>
        <RecentPhotos photos={data.recentPhotos} />
      </FadeIn>
      <FadeIn delay={0.25}>
        <TimelinePreview events={data.timelineEvents} />
      </FadeIn>
    </div>
  )
}
