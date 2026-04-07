import { Calendar } from 'lucide-react'
import { FocusableCard } from '@/components/FocusableCard'
import type { CalendarEvent } from '@/lib/dashboardTypes'

interface EventsWidgetProps {
  events: CalendarEvent[]
}

export function EventsWidget({ events }: EventsWidgetProps) {
  return (
    <FocusableCard className="flex h-full flex-col">
      <div className="mb-5 flex items-center gap-3">
        <Calendar size={20} strokeWidth={1.5} className="text-white/40" />
        <h2 className="font-display text-lg font-medium tracking-wide text-white/60">
          Upcoming
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {events.map((event) => (
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
                {event.time} · {event.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </FocusableCard>
  )
}
