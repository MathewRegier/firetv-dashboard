import { motion } from 'framer-motion'
import { Droplets, Wind } from 'lucide-react'
import { getIcon } from '@/lib/iconMap'
import type { WeatherData } from '@/lib/dashboardTypes'

interface WeatherWidgetProps {
  data: WeatherData
}

export function WeatherWidget({ data }: WeatherWidgetProps) {
  const IconComponent = getIcon(data.icon)

  return (
    <motion.div className="flex items-center gap-6">
      <div className="flex flex-col items-end gap-1">
        <p className="text-[clamp(0.8rem,1vw,1rem)] font-medium tracking-wider text-sky-400/60 uppercase">
          {data.locationLabel}
        </p>
        <div className="flex items-start gap-3">
          <span className="font-display text-[clamp(2.8rem,4.5vw,5rem)] leading-none font-light text-white">
            {data.temperature}°C
          </span>
          {IconComponent && (
            <IconComponent
              className="mt-1 text-sky-300/70"
              size={40}
              strokeWidth={1.5}
            />
          )}
        </div>
        <p className="text-[clamp(0.9rem,1.2vw,1.3rem)] font-light text-white/50">
          {data.condition}
        </p>
        <div className="flex items-center gap-4 text-[clamp(0.8rem,1vw,1.1rem)] text-white/35">
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
