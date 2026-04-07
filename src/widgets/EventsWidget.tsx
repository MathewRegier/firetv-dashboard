import { Calendar } from 'lucide-react'
import { FocusableCard } from '@/components/FocusableCard'
import type { CalendarEvent } from '@/lib/dashboardTypes'

interface EventsWidgetProps {
  events: CalendarEvent[]
  loading?: boolean
}

export function EventsWidget({ events, loading = false }: EventsWidgetProps) {
  return (
    <FocusableCard className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex shrink-0 items-center gap-2">
        <Calendar size={18} strokeWidth={1.5} className="text-white/40" />
        <h2 className="font-display text-base font-medium tracking-wide text-white/60">
          Upcoming
        </h2>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 overflow-hidden">
        {loading && (
          <p className="text-[clamp(0.85rem,1vw,1rem)] text-white/35">
            Loading calendar…
          </p>
        )}
        {!loading && events.length === 0 && (
          <p className="text-[clamp(0.85rem,1vw,1rem)] text-white/35">
            No upcoming events
          </p>
        )}
        {!loading &&
          events.map((event) => (
            <div key={event.id} className="flex items-start gap-3">
              <div
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: event.color }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[clamp(0.95rem,1.1vw,1.15rem)] font-medium text-white/90">
                  {event.title}
                </p>
                <p className="text-[clamp(0.8rem,0.9vw,0.95rem)] text-white/35">
                  {[event.date, event.time, event.duration]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            </div>
          ))}
      </div>
    </FocusableCard>
  )
}
