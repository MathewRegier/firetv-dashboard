import { useState, useEffect } from 'react'
import type { WeatherData } from '@/lib/dashboardTypes'
import { normalizeWeatherApiJson } from '@/lib/openMeteoWeather'

/**
 * Live weather from `GET /api/weather` (Vite dev middleware or Express).
 * Requires `OPENWEATHER_API_KEY` in `.env` (see `.env.example`). Works on localhost.
 */
export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/weather', { cache: 'no-store' })
        if (cancelled) return
        const json: unknown = await res.json().catch(() => ({}))
        if (res.ok) {
          setError(null)
          const fromApi = normalizeWeatherApiJson(json)
          if (fromApi) setData(fromApi)
          else setError('Invalid weather response')
          return
        }
        const msg =
          typeof (json as { error?: string }).error === 'string'
            ? (json as { error: string }).error
            : `Weather request failed (${res.status})`
        setError(msg)
      } catch {
        if (!cancelled) setError('Could not reach weather service')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}
