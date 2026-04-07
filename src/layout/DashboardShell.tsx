import type { ReactNode } from 'react'
import { BackgroundVideoLayer } from '@/components/BackgroundVideoLayer'
import { useTvFocusNavigation } from '@/hooks/useTvFocusNavigation'

interface DashboardShellProps {
  children: ReactNode
  videoSrc?: string
}

export function DashboardShell({ children, videoSrc }: DashboardShellProps) {
  useTvFocusNavigation()

  return (
    <BackgroundVideoLayer videoSrc={videoSrc}>
      <div className="flex h-full w-full flex-col px-[3.2vw] py-[2.8vh]">
        {children}
      </div>
    </BackgroundVideoLayer>
  )
}
