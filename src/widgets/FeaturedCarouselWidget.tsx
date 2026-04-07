import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getIcon } from '@/lib/iconMap'
import type { FeaturedItem } from '@/lib/dashboardTypes'

interface FeaturedCarouselWidgetProps {
  items: FeaturedItem[]
  intervalMs?: number
}

export function FeaturedCarouselWidget({
  items,
  intervalMs = 8000,
}: FeaturedCarouselWidgetProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [items.length, intervalMs])

  const current = items[activeIndex]
  const FeaturedIcon = getIcon(current.icon)

  return (
    <div
      data-focusable="true"
      tabIndex={0}
      className="relative flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-white/[0.08] outline-none transition-all duration-300 focus:border-sky-400/50 focus:shadow-[0_0_40px_-5px_rgba(56,189,248,0.2)]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className={`absolute inset-0 bg-gradient-to-br ${current.gradient}`}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between p-[clamp(0.75rem,1.5vmin,1.15rem)]">
        <div className="min-h-0">
          <div className="mb-2 flex items-center gap-2">
            {FeaturedIcon && (
              <FeaturedIcon
                size={20}
                strokeWidth={1.5}
                className="text-white/50"
              />
            )}
            <span className="text-[clamp(0.7rem,0.8vw,0.88rem)] font-medium tracking-wider text-white/40 uppercase">
              {current.subtitle}
            </span>
          </div>
          <h3 className="font-display mb-2 line-clamp-2 text-[clamp(1.15rem,1.75vw,1.85rem)] leading-tight font-semibold text-white/90">
            {current.title}
          </h3>
          <p className="line-clamp-3 max-w-md text-[clamp(0.78rem,0.95vw,1rem)] leading-snug text-white/45">
            {current.description}
          </p>
        </div>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? 'w-8 bg-white/60'
                  : 'w-3 bg-white/20 hover:bg-white/30'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
