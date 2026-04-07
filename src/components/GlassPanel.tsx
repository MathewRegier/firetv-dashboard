import type { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type Intensity = 'subtle' | 'medium' | 'strong'

interface GlassPanelProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  className?: string
  intensity?: Intensity
}

const intensityMap: Record<Intensity, string> = {
  subtle: 'bg-white/[0.03] backdrop-blur-md border-white/[0.05]',
  medium: 'bg-white/[0.06] backdrop-blur-xl border-white/[0.08]',
  strong: 'bg-white/[0.10] backdrop-blur-2xl border-white/[0.12]',
}

export function GlassPanel({
  children,
  className,
  intensity = 'medium',
  ...motionProps
}: GlassPanelProps) {
  return (
    <motion.div
      className={cn('rounded-3xl border', intensityMap[intensity], className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}
