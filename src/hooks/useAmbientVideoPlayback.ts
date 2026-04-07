import { type RefObject, useLayoutEffect } from 'react'

/**
 * Helps background MP4 autoplay on TV WebViews (Fire TV, Fully Kiosk, etc.):
 * programmatic play(), muted enforcement, retries, and first-input unlock.
 */
export function useAmbientVideoPlayback(
  videoRef: RefObject<HTMLVideoElement | null>,
  src: string | undefined,
) {
  useLayoutEffect(() => {
    if (!src) return

    let cancelled = false
    let unbind: (() => void) | undefined

    const bind = (v: HTMLVideoElement) => {
      v.muted = true
      v.defaultMuted = true
      v.setAttribute('playsinline', '')
      v.setAttribute('webkit-playsinline', '')

      const tryPlay = () => {
        if (cancelled) return
        const el = videoRef.current
        if (!el) return
        el.muted = true
        void el.play().catch(() => {
          /* autoplay blocked — interaction handlers may recover */
        })
      }

      const onReady = () => tryPlay()

      v.addEventListener('canplay', onReady)
      v.addEventListener('loadeddata', onReady)

      tryPlay()

      const delays = [0, 350, 900, 2000, 4000]
      const timeoutIds = delays.map((ms) => window.setTimeout(tryPlay, ms))

      const onVis = () => {
        if (document.visibilityState === 'visible') tryPlay()
      }
      document.addEventListener('visibilitychange', onVis)
      window.addEventListener('pageshow', tryPlay)
      window.addEventListener('focus', tryPlay)

      const onFirstUnlock = () => {
        tryPlay()
      }
      window.addEventListener('pointerdown', onFirstUnlock, {
        capture: true,
        passive: true,
      })
      window.addEventListener('keydown', onFirstUnlock, { capture: true })
      window.addEventListener('keyup', onFirstUnlock, { capture: true })

      return () => {
        v.removeEventListener('canplay', onReady)
        v.removeEventListener('loadeddata', onReady)
        document.removeEventListener('visibilitychange', onVis)
        window.removeEventListener('pageshow', tryPlay)
        window.removeEventListener('focus', tryPlay)
        window.removeEventListener('pointerdown', onFirstUnlock, true)
        window.removeEventListener('keydown', onFirstUnlock, true)
        window.removeEventListener('keyup', onFirstUnlock, true)
        timeoutIds.forEach((id) => clearTimeout(id))
      }
    }

    const tryAttach = () => {
      const v = videoRef.current
      if (!v || cancelled || unbind) return
      unbind = bind(v)
    }

    tryAttach()
    const t = window.setTimeout(tryAttach, 0)

    return () => {
      cancelled = true
      clearTimeout(t)
      unbind?.()
    }
  }, [src, videoRef])
}
