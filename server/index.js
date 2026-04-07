/**
 * Production server: serves Vite `dist/`, GET /api/calendar/events, GET /api/weather.
 * - CALENDAR_ICAL_URL: Google Calendar secret iCal URL (server-only).
 * - Weather: set OPENWEATHER_API_KEY (recommended) or rely on Open-Meteo fallback.
 *   WEATHER_LATITUDE / WEATHER_LONGITUDE / WEATHER_LOCATION_LABEL for location.
 */
import 'dotenv/config'
import express from 'express'
import { existsSync } from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ical from 'node-ical'
import { getWeatherJson } from './weatherService.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT) || 8787
const dist = path.join(__dirname, '..', 'dist')

const PALETTE = [
  '#38bdf8',
  '#a78bfa',
  '#34d399',
  '#fb923c',
  '#f472b6',
  '#22d3ee',
]

function hashColor(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0
  return PALETTE[Math.abs(h) % PALETTE.length]
}

function formatDuration(start, end) {
  const ms = end.getTime() - start.getTime()
  const mins = Math.round(ms / 60000)
  if (mins <= 0) return '0 min'
  if (mins < 60) return `${mins} min`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (m === 0) return h === 1 ? '1 hr' : `${h} hr`
  return `${h} hr ${m} min`
}

function formatDate(start) {
  return start.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

function formatTime(start, allDay) {
  if (allDay) return 'All day'
  return start.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
}

app.get('/api/weather', async (req, res) => {
  try {
    res.json(await getWeatherJson())
  } catch (e) {
    if (e?.code === 'WEATHER_CONFIG') {
      return res.status(503).json({
        error: e.message,
        code: 'WEATHER_CONFIG',
      })
    }
    if (e?.code === 'WEATHER_AUTH') {
      return res.status(401).json({
        error: e.message,
        code: 'WEATHER_AUTH',
      })
    }
    console.error('[weather]', e)
    res.status(502).json({
      error: e?.message ?? 'Failed to load weather',
      code: 'WEATHER_UPSTREAM',
    })
  }
})

app.get('/api/calendar/events', async (req, res) => {
  try {
    const url = process.env.CALENDAR_ICAL_URL?.trim()
    if (!url) {
      return res.status(503).json({
        error: 'CALENDAR_ICAL_URL not set',
        events: [],
      })
    }

    const limit = Math.min(
      50,
      Math.max(1, parseInt(String(req.query.limit ?? '10'), 10) || 10),
    )

    const data = await ical.async.fromURL(url, {
      headers: { 'User-Agent': 'firetv-dashboard/1.0' },
    })

    const now = new Date()
    const rows = []

    for (const ev of Object.values(data)) {
      if (ev.type !== 'VEVENT') continue
      if (!ev.start) continue

      let start =
        ev.start instanceof Date
          ? new Date(ev.start.getTime())
          : new Date(ev.start)
      let end = ev.end
        ? ev.end instanceof Date
          ? new Date(ev.end.getTime())
          : new Date(ev.end)
        : new Date(start.getTime() + 60 * 60 * 1000)

      if (end.getTime() < start.getTime()) {
        const tmp = start
        start = end
        end = tmp
      }

      if (end < now) continue

      const allDay = ev.datetype === 'date'

      rows.push({ ev, start, end, allDay })
    }

    rows.sort((a, b) => a.start - b.start)

    const events = rows.slice(0, limit).map(({ ev, start, end, allDay }) => {
      const uid = String(
        ev.uid ?? `${ev.summary ?? 'event'}-${start.toISOString()}`,
      )
      return {
        id: uid,
        title: String(ev.summary ?? '(No title)'),
        date: formatDate(start),
        start: start.toISOString(),
        end: end.toISOString(),
        allDay,
        time: formatTime(start, allDay),
        duration: formatDuration(start, end),
        color: hashColor(uid),
      }
    })

    res.json({ events })
  } catch (e) {
    console.error('[calendar]', e)
    res.status(502).json({
      error: 'Failed to load calendar',
      events: [],
    })
  }
})

const indexHtml = path.join(dist, 'index.html')
if (existsSync(indexHtml)) {
  app.use(express.static(dist))
  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.sendFile(indexHtml, (err) => {
      if (err) {
        console.error('[spa]', err)
        res.status(500).end()
      }
    })
  })
} else {
  app.use((req, res) => {
    if (!req.path.startsWith('/api')) {
      res.status(503).send('Run npm run build, or use Vite dev for the UI.')
      return
    }
    res.status(404).json({ error: 'Not found' })
  })
}

app.listen(port, () => {
  console.log(`[server] http://localhost:${port}`)
})
