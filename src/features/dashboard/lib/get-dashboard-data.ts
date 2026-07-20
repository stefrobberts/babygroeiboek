import { subDays, subHours, subMinutes } from "date-fns"

import type { DashboardData } from "@/features/dashboard/types"

/**
 * Foundation-stage data source for the dashboard. Returns realistically
 * shaped demo data so the UI, layout and design system can be built and
 * reviewed before the feeding/sleep/diaper/photo features exist. Once those
 * features land, swap this implementation for real Supabase queries — every
 * component below already consumes `DashboardData`, so nothing else changes.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const now = new Date()

  return {
    baby: {
      firstName: "Sophie",
      nickname: "Fien",
      photoUrl: null,
      birthDate: subDays(now, 71).toISOString(),
    },
    nextMilestone: {
      title: "Eerste keer omrollen",
      ageRange: "2-3 maanden",
    },
    lastFeed: {
      type: "breast",
      side: "left",
      amountMl: null,
      startedAt: subHours(now, 1.5).toISOString(),
    },
    lastSleep: {
      startedAt: subHours(now, 3).toISOString(),
      endedAt: subHours(now, 1.4).toISOString(),
    },
    lastDiaper: {
      type: "wee",
      occurredAt: subMinutes(now, 45).toISOString(),
    },
    aiTip: {
      title: "AI tip van vandaag",
      content:
        "Sophie slaapt de afgelopen week gemiddeld 40 minuten langer per nacht. Rond deze leeftijd helpt een vast bedtijdritueel om dit patroon vast te houden.",
    },
    recentPhotos: [
      {
        id: "photo-1",
        takenAt: subDays(now, 1).toISOString(),
        caption: "Eerste keer in het park",
        isFavorite: true,
      },
      {
        id: "photo-2",
        takenAt: subDays(now, 3).toISOString(),
        caption: "Samen met opa",
        isFavorite: false,
      },
      {
        id: "photo-3",
        takenAt: subDays(now, 6).toISOString(),
        caption: null,
        isFavorite: false,
      },
      {
        id: "photo-4",
        takenAt: subDays(now, 9).toISOString(),
        caption: "Diepe slaap",
        isFavorite: true,
      },
    ],
    timelineEvents: [
      {
        id: "event-1",
        type: "diaper",
        title: "Luier verschoond",
        description: "Plas",
        occurredAt: subMinutes(now, 45).toISOString(),
      },
      {
        id: "event-2",
        type: "sleep",
        title: "Middagdutje",
        description: "1 uur en 36 minuten geslapen",
        occurredAt: subHours(now, 3).toISOString(),
      },
      {
        id: "event-3",
        type: "feed",
        title: "Borstvoeding",
        description: "Linkerkant, 18 minuten",
        occurredAt: subHours(now, 5).toISOString(),
      },
      {
        id: "event-4",
        type: "photo",
        title: "Nieuwe foto toegevoegd",
        description: "Eerste keer in het park",
        occurredAt: subDays(now, 1).toISOString(),
      },
      {
        id: "event-5",
        type: "milestone",
        title: "Mijlpaal bereikt",
        description: "Bewust lachen naar mama en papa",
        occurredAt: subDays(now, 4).toISOString(),
      },
    ],
  }
}
