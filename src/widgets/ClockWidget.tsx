import { motion } from 'framer-motion'
import { useClock } from '@/hooks/useClock'

export function ClockWidget() {
  const { displayHours, displayMinutes, period, dateString, locationLabel } =
    useClock()

  return (
    <motion.div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-[clamp(4rem,7vw,7.5rem)] leading-none font-light tracking-tight text-white">
          {displayHours}
        </span>
        <span
          className="font-display text-[clamp(4rem,7vw,7.5rem)] leading-none font-light tracking-tight text-white/80"
          style={{ animation: 'colon-blink 2s ease-in-out infinite' }}
        >
          :
        </span>
        <span className="font-display text-[clamp(4rem,7vw,7.5rem)] leading-none font-light tracking-tight text-white">
          {displayMinutes}
        </span>
        <span className="font-display ml-2 text-[clamp(1.5rem,2.5vw,2.5rem)] leading-none font-normal text-white/50">
          {period}
        </span>
      </div>
      <p className="font-body text-[clamp(1rem,1.6vw,1.6rem)] font-light tracking-wide text-white/40">
        {dateString}
      </p>
      <p className="font-body text-[clamp(0.85rem,1.25vw,1.25rem)] font-medium tracking-wide text-sky-400/50">
        {locationLabel}
      </p>
    </motion.div>
  )
}
