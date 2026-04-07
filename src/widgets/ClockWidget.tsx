import { motion } from 'framer-motion'
import { useClock } from '@/hooks/useClock'

interface ClockWidgetProps {
  /** Larger type, no city line — paired with sleep / screensaver layout. */
  mode?: 'default' | 'sleep'
}

export function ClockWidget({ mode = 'default' }: ClockWidgetProps) {
  const { displayHours, displayMinutes, period, dateString, locationLabel } =
    useClock()

  const isSleep = mode === 'sleep'

  return (
    <motion.div className="flex flex-col gap-0.5 leading-tight">
      <div className="flex items-baseline gap-2">
        <span
          className={
            isSleep
              ? 'font-display text-[clamp(3rem,8vw,7rem)] leading-none font-light tracking-tight text-white'
              : 'font-display text-[clamp(2.25rem,5vw,5rem)] leading-none font-light tracking-tight text-white'
          }
        >
          {displayHours}
        </span>
        <span
          className={
            isSleep
              ? 'font-display text-[clamp(3rem,8vw,7rem)] leading-none font-light tracking-tight text-white/80'
              : 'font-display text-[clamp(2.25rem,5vw,5rem)] leading-none font-light tracking-tight text-white/80'
          }
          style={{ animation: 'colon-blink 2s ease-in-out infinite' }}
        >
          :
        </span>
        <span
          className={
            isSleep
              ? 'font-display text-[clamp(3rem,8vw,7rem)] leading-none font-light tracking-tight text-white'
              : 'font-display text-[clamp(2.25rem,5vw,5rem)] leading-none font-light tracking-tight text-white'
          }
        >
          {displayMinutes}
        </span>
        <span
          className={
            isSleep
              ? 'font-display ml-2 text-[clamp(1.35rem,2.8vw,2.75rem)] leading-none font-normal text-white/45'
              : 'font-display ml-1 text-[clamp(1.1rem,1.9vw,1.85rem)] leading-none font-normal text-white/50'
          }
        >
          {period}
        </span>
      </div>
      <p
        className={
          isSleep
            ? 'font-body text-[clamp(1rem,1.8vw,1.75rem)] font-light tracking-wide text-white/35'
            : 'font-body text-[clamp(0.8rem,1.25vw,1.35rem)] font-light tracking-wide text-white/40'
        }
      >
        {dateString}
      </p>
      {!isSleep && (
        <p className="font-body text-[clamp(0.7rem,1.05vw,1.05rem)] font-medium tracking-wide text-sky-400/50">
          {locationLabel}
        </p>
      )}
    </motion.div>
  )
}
