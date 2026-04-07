import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { DashboardShell } from '@/layout/DashboardShell'
import { SleepAmbientView } from '@/components/SleepAmbientView'
import { ClockWidget } from '@/widgets/ClockWidget'
import { WeatherWidget } from '@/widgets/WeatherWidget'
import { EventsWidget } from '@/widgets/EventsWidget'
import { HomeStatusWidget } from '@/widgets/HomeStatusWidget'
import { NowPlayingWidget } from '@/widgets/NowPlayingWidget'
import { QuickActionsWidget } from '@/widgets/QuickActionsWidget'
import { NotesWidget } from '@/widgets/NotesWidget'
import { FeaturedCarouselWidget } from '@/widgets/FeaturedCarouselWidget'
import {
  mockWeather,
  mockEvents,
  mockDevices,
  mockMedia,
  mockQuickActions,
  mockNotes,
  mockFeatured,
} from '@/data/dashboardMockData'
import { HOME_STATUS_WIDGET_ENABLED } from '@/lib/featureFlags'
import { SCREENSAVER_VIDEO_SRC } from '@/lib/constants'

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function DashboardPage() {
  const [sleepMode, setSleepMode] = useState(false)

  useEffect(() => {
    if (sleepMode) {
      document.documentElement.dataset.sleepMode = 'true'
    } else {
      document.documentElement.removeAttribute('data-sleep-mode')
    }
  }, [sleepMode])

  useEffect(() => {
    if (!sleepMode) return

    const wake = (e: Event) => {
      setSleepMode(false)
      e.preventDefault()
      if ('stopImmediatePropagation' in e) {
        ;(e as KeyboardEvent).stopImmediatePropagation()
      }
    }

    document.addEventListener('keydown', wake, { capture: true })
    document.addEventListener('click', wake, { capture: true })
    return () => {
      document.removeEventListener('keydown', wake, { capture: true })
      document.removeEventListener('click', wake, { capture: true })
    }
  }, [sleepMode])

  const onQuickAction = useCallback((actionId: string) => {
    if (actionId === 'sleep') {
      setSleepMode(true)
    }
  }, [])

  return (
    <DashboardShell
      videoSrc={SCREENSAVER_VIDEO_SRC}
      sleepMode={sleepMode}
    >
      {sleepMode ? (
        <SleepAmbientView weather={mockWeather} />
      ) : (
        <motion.div
          className="flex h-full min-h-0 flex-1 flex-col gap-[clamp(0.35rem,0.85vh,0.65rem)] overflow-hidden"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex shrink-0 items-end justify-between gap-4 overflow-hidden"
            variants={fadeUp}
          >
            <ClockWidget />
            <WeatherWidget data={mockWeather} />
          </motion.div>

          <motion.div
            className="grid min-h-0 min-w-0 flex-1 grid-cols-4 gap-[clamp(0.35rem,0.85vmin,0.6rem)] overflow-hidden [grid-template-rows:minmax(0,1fr)_minmax(0,1fr)]"
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="min-h-0">
              <EventsWidget events={mockEvents} />
            </motion.div>
            {HOME_STATUS_WIDGET_ENABLED && (
              <motion.div variants={fadeUp} className="col-span-1 min-h-0">
                <HomeStatusWidget devices={mockDevices} />
              </motion.div>
            )}
            <motion.div
              variants={fadeUp}
              className={
                HOME_STATUS_WIDGET_ENABLED
                  ? 'col-span-2 min-h-0'
                  : 'col-span-3 min-h-0'
              }
            >
              <FeaturedCarouselWidget items={mockFeatured} />
            </motion.div>
            <motion.div variants={fadeUp} className="col-span-1 min-h-0">
              <NowPlayingWidget track={mockMedia} />
            </motion.div>
            <motion.div variants={fadeUp} className="col-span-1 min-h-0">
              <QuickActionsWidget
                actions={mockQuickActions}
                onSelect={onQuickAction}
              />
            </motion.div>
            <motion.div variants={fadeUp} className="col-span-2 min-h-0">
              <NotesWidget notes={mockNotes} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </DashboardShell>
  )
}
