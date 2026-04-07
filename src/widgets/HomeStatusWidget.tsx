import { Home } from 'lucide-react'
import { FocusableCard } from '@/components/FocusableCard'
import { getIcon } from '@/lib/iconMap'
import type { HomeDevice } from '@/lib/dashboardTypes'

interface HomeStatusWidgetProps {
  devices: HomeDevice[]
}

export function HomeStatusWidget({ devices }: HomeStatusWidgetProps) {
  return (
    <FocusableCard className="flex h-full min-h-0 flex-col">
      <div className="mb-2 flex shrink-0 items-center gap-2">
        <Home size={18} strokeWidth={1.5} className="text-white/40" />
        <h2 className="font-display text-base font-medium tracking-wide text-white/60">
          Home
        </h2>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-2 overflow-hidden">
        {devices.map((device) => {
          const DeviceIcon = getIcon(device.icon)
          return (
            <div key={device.id} className="flex items-center gap-3">
              {DeviceIcon && (
                <DeviceIcon
                  size={18}
                  strokeWidth={1.5}
                  className={device.active ? 'text-sky-400/70' : 'text-white/20'}
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[clamp(0.9rem,1vw,1.05rem)] font-medium text-white/80">
                  {device.name}
                </p>
              </div>
              <span className="shrink-0 text-[clamp(0.75rem,0.85vw,0.9rem)] text-white/35">
                {device.status}
              </span>
            </div>
          )
        })}
      </div>
    </FocusableCard>
  )
}
