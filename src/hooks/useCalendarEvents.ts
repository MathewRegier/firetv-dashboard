import { useState, useEffect } from 'react'
import type { CalendarEvent } from '@/lib/dashboardTypes'
import { mockEvents } from '@/data/dashboardMockData'
import { normalizeCalendarEvent } from '@/lib/normalizeCalendarEvent'

interface CalendarApiResponse {
  events?: CalendarEvent[]
  error?: string
}

export function useCalendarEvents(limit = 8) {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(`/api/calendar/events?limit=${limit}`, {
          cache: 'no-store',
        })
        const data = (await res.json()) as CalendarApiResponse
        if (cancelled) return

        if (res.ok && Array.isArray(data.events)) {
          setEvents(
            data.events.map((e) =>
              normalizeCalendarEvent(e as unknown as Record<string, unknown>),
            ),
          )
          return
        }
      } catch {
        /* network / parse */
      }
      if (!cancelled) {
        setEvents(mockEvents.map((e) => normalizeCalendarEvent(e)))
      }
    }

    void load().finally(() => {
      if (!cancelled) setLoading(false)
    })

    return () => {
      cancelled = true
    }
  }, [limit])

  return { events, loading }
}
