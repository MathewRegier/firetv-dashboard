import { forwardRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FocusableCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const FocusableCard = forwardRef<HTMLDivElement, FocusableCardProps>(
  function FocusableCard({ children, className, onClick }, ref) {
    return (
      <motion.div
        ref={ref}
        data-focusable="true"
        tabIndex={0}
        className={cn(
          'rounded-3xl border border-white/[0.08] bg-white/[0.06] backdrop-blur-xl',
          'p-7 outline-none',
          'transition-all duration-300 ease-out',
          'focus:scale-[1.02] focus:border-sky-400/60 focus:bg-white/[0.10]',
          'focus:shadow-[0_0_0_1px_rgba(56,189,248,0.4),0_0_40px_-5px_rgba(56,189,248,0.25)]',
          'hover:border-white/[0.14] hover:bg-white/[0.08]',
          className,
        )}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onClick) onClick()
        }}
      >
        {children}
      </motion.div>
    )
  },
)
