import { StickyNote, Circle, CircleCheck } from 'lucide-react'
import { FocusableCard } from '@/components/FocusableCard'
import type { NoteItem } from '@/lib/dashboardTypes'

interface NotesWidgetProps {
  notes: NoteItem[]
}

const priorityColors: Record<NoteItem['priority'], string> = {
  high: 'text-rose-400/70',
  medium: 'text-amber-400/60',
  low: 'text-white/25',
}

export function NotesWidget({ notes }: NotesWidgetProps) {
  return (
    <FocusableCard className="flex h-full flex-col">
      <div className="mb-5 flex items-center gap-3">
        <StickyNote size={20} strokeWidth={1.5} className="text-white/40" />
        <h2 className="font-display text-lg font-medium tracking-wide text-white/60">
          Reminders
        </h2>
      </div>
      <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto">
        {notes.map((note) => (
          <div key={note.id} className="flex items-start gap-3">
            {note.completed ? (
              <CircleCheck
                size={20}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-emerald-400/60"
              />
            ) : (
              <Circle
                size={20}
                strokeWidth={1.5}
                className={`mt-0.5 shrink-0 ${priorityColors[note.priority]}`}
              />
            )}
            <p
              className={`text-[clamp(0.9rem,1vw,1.05rem)] leading-snug ${
                note.completed
                  ? 'text-white/25 line-through'
                  : 'text-white/75'
              }`}
            >
              {note.text}
            </p>
          </div>
        ))}
      </div>
    </FocusableCard>
  )
}
