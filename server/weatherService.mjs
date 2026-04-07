/**
 * Weather for GET /api/weather (Express + Vite dev).
 *
 * Uses OpenWeatherMap only (free tier: https://openweathermap.org/api ).
 * Set OPENWEATHER_API_KEY in .env — server-side only, works fine on localhost.
 */
import 'dotenv/config'

function envNum(key, fallback) {
  const v = process.env[key]
  if (v == null || v === '') return fallback
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

const WEATHER_LAT = envNum('WEATHER_LATITUDE', 42.3149)
const WEATHER_LON = envNum('WEATHER_LONGITUDE', -83.0364)
const WEATHER_LABEL =
  process.env.WEATHER_LOCATION_LABEL?.trim() || 'Windsor, Ontario'

/** OpenWeather condition id → lucide icon key */
function owmIdToIcon(id) {
  const i = Number(id)
  if (i === 800) return 'sun'
  if (i === 801 || i === 802) return 'cloud-sun'
  if (i >= 803 && i <= 804) return 'cloud'
  if (i >= 200 && i < 300) return 'cloud-rain'
  if (i >= 300 && i < 400) return 'cloud-rain'
  if (i >= 500 && i < 600) return 'cloud-rain'
  if (i >= 600 && i < 700) return 'snowflake'
  if (i >= 700 && i < 800) return 'cloud'
  return 'cloud-sun'
}

function titleCaseDescription(desc) {
  if (!desc || typeof desc !== 'string') return 'Unknown'
  return desc
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

async function fetchOpenWeatherPayload(apiKey) {
  const params = new URLSearchParams({
    lat: String(WEATHER_LAT),
    lon: String(WEATHER_LON),
    appid: apiKey,
    units: 'metric',
  })
  const url = `https://api.openweathermap.org/data/2.5/weather?${params}`
  const r = await fetch(url, {
    headers: { 'User-Agent': 'firetv-dashboard/1.0' },
    signal: AbortSignal.timeout(35_000),
  })
  const text = await r.text()
  if (!r.ok) {
    if (r.status === 401) {
      const err = new Error(
        'OpenWeather returned 401 (invalid key). New keys often need 10 minutes–2 hours to activate. In openweathermap.org: API keys → copy the key; Subscriptions → enable “Current Weather Data” (free); .env → OPENWEATHER_API_KEY=key with no quotes or spaces.',
      )
      err.code = 'WEATHER_AUTH'
      throw err
    }
    throw new Error(`OpenWeather HTTP ${r.status}: ${text.slice(0, 180)}`)
  }
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('OpenWeather: invalid JSON')
  }

  const w0 = data.weather?.[0]
  const id = w0?.id ?? 800
  const main = data.main || {}
  const wind = data.wind || {}

  const temp = Number(main.temp)
  const hi = Number(main.temp_max ?? main.temp)
  const lo = Number(main.temp_min ?? main.temp)
  const hum = Number(main.humidity ?? 0)
  const windMs = Number(wind.speed ?? 0)
  const windKmh = Math.round(windMs * 3.6)

  if (!Number.isFinite(temp)) throw new Error('OpenWeather: bad temperature')

  return {
    locationLabel: WEATHER_LABEL,
    temperature: Math.round(temp),
    condition: titleCaseDescription(w0?.description),
    high: Math.round(Number.isFinite(hi) ? hi : temp),
    low: Math.round(Number.isFinite(lo) ? lo : temp),
    humidity: Math.round(Number.isFinite(hum) ? hum : 0),
    wind: Number.isFinite(windKmh) ? windKmh : 0,
    windUnit: 'km/h',
    icon: owmIdToIcon(id),
  }
}

/** JSON body for GET /api/weather */
export async function getWeatherJson() {
  const key = process.env.OPENWEATHER_API_KEY?.trim()
  if (!key) {
    const err = new Error(
      'Add OPENWEATHER_API_KEY to .env (free key at openweathermap.org/api)',
    )
    err.code = 'WEATHER_CONFIG'
    throw err
  }
  return await fetchOpenWeatherPayload(key)
}
