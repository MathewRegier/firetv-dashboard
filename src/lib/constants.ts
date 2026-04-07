/** Windsor, ON — same IANA zone as Toronto (Eastern Time). */
export const WINDSOR_TIMEZONE = 'America/Toronto'

export const WINDSOR_LOCATION_LABEL = 'Windsor, Ontario'

/**
 * Background video URL.
 * - Local: place `California-Dolphions.mp4` under `public/screensaver-videos/` (gitignored if large).
 * - Production (Railway, etc.): set `VITE_SCREENSAVER_VIDEO_URL` to a full HTTPS URL where the file is hosted
 *   (the file is not in git when over GitHub’s size limit).
 */
const envVideo = import.meta.env.VITE_SCREENSAVER_VIDEO_URL?.trim()
export const SCREENSAVER_VIDEO_SRC =
  envVideo && envVideo.length > 0
    ? envVideo
    : '/screensaver-videos/California-Dolphions.mp4'
