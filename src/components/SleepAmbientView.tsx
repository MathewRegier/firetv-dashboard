import { motion } from 'framer-motion'
import { ClockWidget } from '@/widgets/ClockWidget'
import { WeatherWidget } from '@/widgets/WeatherWidget'
import type { WeatherData } from '@/lib/dashboardTypes'

interface SleepAmbientViewProps {
  weather: WeatherData
}

export function SleepAmbientView({ weather }: SleepAmbientViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full min-h-0 w-full flex-1 flex-col justify-center overflow-hidden px-[clamp(1.25rem,4vw,3.5rem)] py-[clamp(1rem,3vh,2rem)]"
    >
      <div className="flex min-h-0 w-full flex-1 flex-row items-center justify-between gap-8">
        <div className="flex min-w-0 flex-1 items-center justify-start">
          <ClockWidget mode="sleep" />
        </div>
        <div className="flex min-w-0 flex-1 items-center justify-end">
          <WeatherWidget data={weather} mode="sleep" />
        </div>
      </div>
    </motion.div>
  )
}
