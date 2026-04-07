import { Music, Play, SkipBack, SkipForward } from 'lucide-react'
import { FocusableCard } from '@/components/FocusableCard'
import type { MediaTrack } from '@/lib/dashboardTypes'

interface NowPlayingWidgetProps {
  track: MediaTrack
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function NowPlayingWidget({ track }: NowPlayingWidgetProps) {
  const progressPercent = (track.progress / track.duration) * 100

  return (
    <FocusableCard className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <Music size={20} strokeWidth={1.5} className="text-white/40" />
        <h2 className="font-display text-lg font-medium tracking-wide text-white/60">
          Now Playing
        </h2>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600/40 to-fuchsia-600/40">
          <Music size={24} strokeWidth={1.5} className="text-white/60" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[clamp(1rem,1.15vw,1.2rem)] font-semibold text-white/90">
            {track.title}
          </p>
          <p className="truncate text-[clamp(0.85rem,0.95vw,1rem)] text-white/40">
            {track.artist}
          </p>
          <p className="truncate text-[clamp(0.75rem,0.85vw,0.9rem)] text-white/25">
            {track.album}
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500/80 to-fuchsia-500/60 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="mb-3 flex justify-between text-[clamp(0.7rem,0.8vw,0.85rem)] text-white/30">
          <span>{formatTime(track.progress)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
        <div className="flex items-center justify-center gap-6">
          <SkipBack
            size={18}
            strokeWidth={1.5}
            className="text-white/30 transition-colors hover:text-white/60"
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08]">
            <Play
              size={18}
              strokeWidth={1.5}
              className="ml-0.5 text-white/70"
            />
          </div>
          <SkipForward
            size={18}
            strokeWidth={1.5}
            className="text-white/30 transition-colors hover:text-white/60"
          />
        </div>
      </div>
    </FocusableCard>
  )
}
