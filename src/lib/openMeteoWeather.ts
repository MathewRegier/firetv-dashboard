import type { WeatherData } from '@/lib/dashboardTypes'

/** Coerce JSON from `GET /api/weather` into WeatherData (numbers may arrive as strings). */
export function normalizeWeatherApiJson(json: unknown): WeatherData | null {
  if (!json || typeof json !== 'object') return null
  const o = json as Record<string, unknown>
  const temperature = Number(o.temperature)
  const high = Number(o.high)
  const low = Number(o.low)
  const humidity = Number(o.humidity)
  const wind = Number(o.wind)
  if (
    !Number.isFinite(temperature) ||
    !Number.isFinite(high) ||
    !Number.isFinite(low) ||
    !Number.isFinite(humidity) ||
    !Number.isFinite(wind) ||
    typeof o.locationLabel !== 'string' ||
    typeof o.condition !== 'string' ||
    typeof o.icon !== 'string'
  ) {
    return null
  }
  const windUnit =
    o.windUnit === 'mph' || o.windUnit === 'km/h' ? o.windUnit : 'km/h'
  return {
    locationLabel: o.locationLabel,
    temperature: Math.round(temperature),
    condition: o.condition,
    high: Math.round(high),
    low: Math.round(low),
    humidity: Math.round(humidity),
    wind: Math.round(wind),
    windUnit,
    icon: o.icon,
  }
}
