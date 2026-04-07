import { Zap } from 'lucide-react'
import { GlassPanel } from '@/components/GlassPanel'
import { getIcon } from '@/lib/iconMap'
import type { QuickAction } from '@/lib/dashboardTypes'

interface QuickActionsWidgetProps {
  actions: QuickAction[]
  onSelect?: (actionId: string) => void
}

export function QuickActionsWidget({ actions, onSelect }: QuickActionsWidgetProps) {
  return (
    <GlassPanel className="flex h-full min-h-0 flex-col overflow-hidden p-[clamp(0.75rem,1.5vmin,1.15rem)]">
      <div className="mb-2 flex shrink-0 items-center gap-2">
        <Zap size={18} strokeWidth={1.5} className="text-white/40" />
        <h2 className="font-display text-base font-medium tracking-wide text-white/60">
          Quick Actions
        </h2>
      </div>
      <div className="grid min-h-0 min-w-0 flex-1 grid-cols-3 grid-rows-2 gap-2">
        {actions.map((action) => {
          const ActionIcon = getIcon(action.icon)
          return (
            <button
              type="button"
              key={action.id}
              data-focusable="true"
              tabIndex={0}
              className="flex min-h-0 flex-col items-center justify-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-2 outline-none transition-all duration-300 focus:scale-[1.02] focus:border-sky-400/50 focus:bg-white/[0.10] focus:shadow-[0_0_25px_-5px_rgba(56,189,248,0.2)] hover:bg-white/[0.07]"
              onClick={() => onSelect?.(action.id)}
            >
              {ActionIcon && (
                <ActionIcon
                  size={22}
                  strokeWidth={1.5}
                  style={{ color: action.color }}
                  className="opacity-70"
                />
              )}
              <span className="text-[clamp(0.7rem,0.8vw,0.85rem)] font-medium text-white/50">
                {action.label}
              </span>
            </button>
          )
        })}
      </div>
    </GlassPanel>
  )
}
