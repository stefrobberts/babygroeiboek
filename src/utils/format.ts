import { formatDistanceToNow } from "date-fns"
import { nl } from "date-fns/locale"

/** "2 uur geleden", "net" — used throughout the dashboard and timeline. */
export function formatRelativeTime(date: string | Date) {
  const value = typeof date === "string" ? new Date(date) : date
  return formatDistanceToNow(value, { addSuffix: true, locale: nl })
}

/** Minutes as "1u 25m" / "45m" — used for sleep and feeding durations. */
export function formatDurationMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.round(totalMinutes % 60)

  if (hours === 0) {
    return `${minutes}m`
  }

  if (minutes === 0) {
    return `${hours}u`
  }

  return `${hours}u ${minutes}m`
}

/** Grams as "3,45 kg" for weights, falling back to grams under 1 kg. */
export function formatWeight(grams: number) {
  if (grams < 1000) {
    return `${grams} g`
  }

  return `${(grams / 1000).toLocaleString("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} kg`
}

export function formatTime(date: string | Date) {
  const value = typeof date === "string" ? new Date(date) : date
  return value.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  })
}
