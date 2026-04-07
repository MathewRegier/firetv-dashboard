import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useAmbientVideoPlayback } from '@/hooks/useAmbientVideoPlayback'
import { cn } from '@/lib/utils'

interface BackgroundVideoLayerProps {
  videoSrc?: string
  /** Stronger dim / scrims for sleep / screensaver mode. */
  sleepMode?: boolean
  children: ReactNode
}

export function BackgroundVideoLayer({
  videoSrc,
  sleepMode = false,
  children,
}: BackgroundVideoLayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  useAmbientVideoPlayback(videoRef, videoSrc)

  return (
    <div className="fixed inset-0 min-h-0 w-full overflow-hidden">
      {videoSrc ? (
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#050507]" />
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(15,23,60,0.8) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(30,15,50,0.6) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(10,30,40,0.5) 0%, transparent 60%)',
              animation: 'ambient-drift 30s ease-in-out infinite',
            }}
          />
        </div>
      )}

      <div
        className={cn(
          'absolute inset-0',
          sleepMode ? 'bg-black/[0.72]' : 'bg-black/55',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-t via-transparent',
          sleepMode
            ? 'from-black/75 to-black/45'
            : 'from-black/65 to-black/35',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-r via-transparent',
          sleepMode ? 'from-black/40 to-black/40' : 'from-black/28 to-black/28',
        )}
      />

      {/* Subtle film grain for depth */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
