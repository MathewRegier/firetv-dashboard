import type { CalendarEvent } from '@/lib/dashboardTypes'

function formatDateLabel(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatTimeLabel(start: Date, allDay: boolean): string {
  if (allDay) return 'All day'
  return start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatDurationLabel(start: Date, end: Date): string {
  const ms = end.getTime() - start.getTime()
  const mins = Math.round(ms / 60000)
  if (mins <= 0) return '0 min'
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (m === 0) return h === 1 ? '1 hr' : `${h} hr`
  return `${h} hr ${m} min`
}

function parseIso(s: string): Date | null {
  const d = new Date(s)
  return Number.isNaN(d.getTime()) ? null : d
}

function pickStartIso(raw: Record<string, unknown>): string | undefined {
  const keys = ['start', 'startTime', 'dtstart', 'dateStart'] as const
  for (const k of keys) {
    const v = raw[k]
    if (typeof v === 'string' && v.trim().length > 0) return v.trim()
    if (typeof v === 'number' && Number.isFinite(v)) {
      return new Date(v).toISOString()
    }
  }
  return undefined
}

function pickEndIso(
  raw: Record<string, unknown>,
  fallbackFromStartMs: number,
): string | undefined {
  const keys = ['end', 'endTime', 'dtend', 'dateEnd'] as const
  for (const k of keys) {
    const v = raw[k]
    if (typeof v === 'string' && v.trim().length > 0) return v.trim()
    if (typeof v === 'number' && Number.isFinite(v)) {
      return new Date(v).toISOString()
    }
  }
  return new Date(fallbackFromStartMs + 60 * 60 * 1000).toISOString()
}

function pickAllDay(raw: Record<string, unknown>): boolean {
  if (raw.allDay === true) return true
  if (raw.allDay === false) return false
  const t = raw.time
  if (typeof t === 'string' && t.trim().toLowerCase() === 'all day') return true
  return false
}

/**
 * Builds display fields from ISO times when present (matches server logic).
 * Falls back to string fields for mocks or legacy APIs.
 */
export function normalizeCalendarEvent(
  input: Partial<CalendarEvent> | Record<string, unknown>,
): CalendarEvent {
  const raw = input as Record<string, unknown>

  const startIso = pickStartIso(raw)
  const start = startIso ? parseIso(startIso) : null

  if (start) {
    const endIso = pickEndIso(raw, start.getTime())
    const end = parseIso(endIso ?? '') ?? new Date(start.getTime() + 60 * 60 * 1000)
    const allDay = pickAllDay(raw)

    return {
      id: String(raw.id ?? ''),
      title: String(raw.title ?? ''),
      date: formatDateLabel(start),
      time: formatTimeLabel(start, allDay),
      duration: formatDurationLabel(start, end),
      color: String(raw.color ?? '#38bdf8'),
      start: startIso,
      end: endIso,
      allDay,
    }
  }

  let date = String(raw.date ?? '').trim()
  const time = String(raw.time ?? '')
  const duration = String(raw.duration ?? '')

  if (!date && typeof raw.start === 'string') {
    const d = parseIso(raw.start)
    if (d) date = formatDateLabel(d)
  }

  return {
    id: String(raw.id ?? ''),
    title: String(raw.title ?? ''),
    date,
    time,
    duration,
    color: String(raw.color ?? '#38bdf8'),
    start: typeof raw.start === 'string' ? raw.start : undefined,
    end: typeof raw.end === 'string' ? raw.end : undefined,
    allDay: pickAllDay(raw),
  }
}
