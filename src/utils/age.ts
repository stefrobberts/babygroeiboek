import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  differenceInCalendarYears,
} from "date-fns"

/**
 * Formats a baby's age the way a Dutch parent would say it out loud:
 * days for the first weeks, weeks up to ~2 months, months up to 2 years,
 * years after that.
 */
export function formatBabyAge(birthDate: string | Date, now = new Date()) {
  const birth = typeof birthDate === "string" ? new Date(birthDate) : birthDate
  const days = differenceInCalendarDays(now, birth)

  if (days < 0) {
    return "Nog niet geboren"
  }

  if (days === 0) {
    return "Geboren vandaag"
  }

  if (days < 14) {
    return days === 1 ? "1 dag oud" : `${days} dagen oud`
  }

  const weeks = differenceInCalendarWeeks(now, birth)
  if (weeks < 9) {
    return weeks === 1 ? "1 week oud" : `${weeks} weken oud`
  }

  const months = differenceInCalendarMonths(now, birth)
  if (months < 24) {
    return months === 1 ? "1 maand oud" : `${months} maanden oud`
  }

  const years = differenceInCalendarYears(now, birth)
  const remainderMonths = months - years * 12
  if (remainderMonths === 0) {
    return years === 1 ? "1 jaar oud" : `${years} jaar oud`
  }

  return `${years} jaar en ${remainderMonths} ${remainderMonths === 1 ? "maand" : "maanden"} oud`
}
