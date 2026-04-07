import { motion } from 'framer-motion'
import { DashboardShell } from '@/layout/DashboardShell'
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
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

export function DashboardPage() {
  return (
    <DashboardShell>
      <motion.div
        className="flex h-full flex-col gap-[2vh]"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Row: Clock + Weather */}
        <motion.div
          className="flex shrink-0 items-end justify-between"
          variants={fadeUp}
        >
          <ClockWidget />
          <WeatherWidget data={mockWeather} />
        </motion.div>

        {/* Main grid: optional Home status; quick actions always on (general shortcuts). */}
        <motion.div
          className="grid min-h-0 flex-1 grid-cols-4 grid-rows-2 gap-[1.1vw]"
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
              HOME_STATUS_WIDGET_ENABLED ? 'col-span-2 min-h-0' : 'col-span-3 min-h-0'
            }
          >
            <FeaturedCarouselWidget items={mockFeatured} />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-1 min-h-0">
            <NowPlayingWidget track={mockMedia} />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-1 min-h-0">
            <QuickActionsWidget actions={mockQuickActions} />
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-2 min-h-0">
            <NotesWidget notes={mockNotes} />
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardShell>
  )
}
