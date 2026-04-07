import { motion } from 'framer-motion'
import { Droplets, Wind } from 'lucide-react'
import { getIcon } from '@/lib/iconMap'
import type { WeatherData } from '@/lib/dashboardTypes'

interface WeatherWidgetProps {
  data: WeatherData
  mode?: 'default' | 'sleep'
}

export function WeatherWidget({ data, mode = 'default' }: WeatherWidgetProps) {
  const IconComponent = getIcon(data.icon)
  const isSleep = mode === 'sleep'

  return (
    <motion.div className="flex items-center gap-4">
      <div className="flex flex-col items-end gap-0.5 leading-tight">
        <p
          className={
            isSleep
              ? 'text-[clamp(0.75rem,1.1vw,1rem)] font-medium tracking-wider text-sky-400/50 uppercase'
              : 'text-[clamp(0.65rem,0.85vw,0.85rem)] font-medium tracking-wider text-sky-400/60 uppercase'
          }
        >
          {data.locationLabel}
        </p>
        <div className="flex items-start gap-2">
          <span
            className={
              isSleep
                ? 'font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-none font-light text-white'
                : 'font-display text-[clamp(2rem,3.8vw,3.75rem)] leading-none font-light text-white'
            }
          >
            {data.temperature}°C
          </span>
          {IconComponent && (
            <IconComponent
              className="mt-0.5 text-sky-300/70"
              size={isSleep ? 44 : 34}
              strokeWidth={1.5}
            />
          )}
        </div>
        <p
          className={
            isSleep
              ? 'text-[clamp(0.9rem,1.25vw,1.25rem)] font-light text-white/45'
              : 'text-[clamp(0.75rem,1.05vw,1.1rem)] font-light text-white/50'
          }
        >
          {data.condition}
        </p>
        <div
          className={
            isSleep
              ? 'flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-[clamp(0.75rem,1vw,1.05rem)] text-white/30'
              : 'flex flex-wrap items-center justify-end gap-x-3 gap-y-0.5 text-[clamp(0.65rem,0.85vw,0.95rem)] text-white/35'
          }
        >
          <span>
            H:{data.high}°C L:{data.low}°C
          </span>
          <span className="flex items-center gap-1">
            <Droplets size={14} strokeWidth={1.5} />
            {data.humidity}%
          </span>
          <span className="flex items-center gap-1">
            <Wind size={14} strokeWidth={1.5} />
            {data.wind} {data.windUnit}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
