import type {
  DiaperType,
  FeedSide,
  FeedType,
  TimelineEventType,
} from "@/types/database.types"

export interface DashboardBaby {
  firstName: string
  nickname: string | null
  photoUrl: string | null
  birthDate: string
}

export interface DashboardLastFeed {
  type: FeedType
  side: FeedSide | null
  amountMl: number | null
  startedAt: string
}

export interface DashboardLastSleep {
  startedAt: string
  endedAt: string | null
}

export interface DashboardLastDiaper {
  type: DiaperType
  occurredAt: string
}

export interface DashboardNextMilestone {
  title: string
  ageRange: string
}

export interface DashboardAiTip {
  title: string
  content: string
}

export interface DashboardPhoto {
  id: string
  takenAt: string
  caption: string | null
  isFavorite: boolean
}

export interface DashboardTimelineEvent {
  id: string
  type: TimelineEventType
  title: string
  description: string | null
  occurredAt: string
}

export interface DashboardData {
  baby: DashboardBaby
  nextMilestone: DashboardNextMilestone | null
  lastFeed: DashboardLastFeed | null
  lastSleep: DashboardLastSleep | null
  lastDiaper: DashboardLastDiaper | null
  aiTip: DashboardAiTip
  recentPhotos: DashboardPhoto[]
  timelineEvents: DashboardTimelineEvent[]
}
