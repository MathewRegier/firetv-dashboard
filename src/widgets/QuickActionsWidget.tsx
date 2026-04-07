import { Zap } from 'lucide-react'
import { GlassPanel } from '@/components/GlassPanel'
import { getIcon } from '@/lib/iconMap'
import type { QuickAction } from '@/lib/dashboardTypes'

interface QuickActionsWidgetProps {
  actions: QuickAction[]
}

export function QuickActionsWidget({ actions }: QuickActionsWidgetProps) {
  return (
    <GlassPanel className="flex h-full flex-col p-7">
      <div className="mb-5 flex items-center gap-3">
        <Zap size={20} strokeWidth={1.5} className="text-white/40" />
        <h2 className="font-display text-lg font-medium tracking-wide text-white/60">
          Quick Actions
        </h2>
      </div>
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-3">
        {actions.map((action) => {
          const ActionIcon = getIcon(action.icon)
          return (
            <button
              key={action.id}
              data-focusable="true"
              tabIndex={0}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-3 outline-none transition-all duration-300 focus:scale-[1.05] focus:border-sky-400/50 focus:bg-white/[0.10] focus:shadow-[0_0_25px_-5px_rgba(56,189,248,0.2)] hover:bg-white/[0.07]"
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
