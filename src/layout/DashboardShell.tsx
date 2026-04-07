import type { ReactNode } from 'react'
import { BackgroundVideoLayer } from '@/components/BackgroundVideoLayer'
import { useTvFocusNavigation } from '@/hooks/useTvFocusNavigation'

interface DashboardShellProps {
  children: ReactNode
  videoSrc?: string
  sleepMode?: boolean
}

export function DashboardShell({
  children,
  videoSrc,
  sleepMode = false,
}: DashboardShellProps) {
  useTvFocusNavigation()

  return (
    <BackgroundVideoLayer videoSrc={videoSrc} sleepMode={sleepMode}>
      <div className="box-border flex h-full min-h-0 w-full flex-col overflow-hidden px-[clamp(1rem,2.8vw,2.75rem)] py-[clamp(0.5rem,1.6vh,1.35rem)]">
        {children}
      </div>
    </BackgroundVideoLayer>
  )
}
