import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

/**
 * Serves GET /api/weather inside the Vite process so `vite` alone works (no 502 when
 * `server/index.js` is not running). Calendar stays proxied to Express on 8787.
 */
function weatherDevPlugin(): Plugin {
  return {
    name: 'weather-api-in-vite',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'GET') {
          next()
          return
        }
        const pathname = req.url?.split('?')[0] ?? ''
        if (pathname !== '/api/weather') {
          next()
          return
        }
        try {
          const { getWeatherJson } = await import(
            new URL('./server/weatherService.mjs', import.meta.url).href
          )
          const payload = await getWeatherJson()
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify(payload))
        } catch (err: unknown) {
          console.error('[vite dev weather]', err)
          const e = err as { code?: string; message?: string }
          const isConfig = e.code === 'WEATHER_CONFIG'
          const isAuth = e.code === 'WEATHER_AUTH'
          res.statusCode = isConfig ? 503 : isAuth ? 401 : 502
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error:
                e.message ??
                (isConfig
                  ? 'Weather not configured'
                  : 'Failed to load weather'),
              code: isConfig
                ? 'WEATHER_CONFIG'
                : isAuth
                  ? 'WEATHER_AUTH'
                  : 'WEATHER_UPSTREAM',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [weatherDevPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/calendar': {
        target: 'http://127.0.0.1:8787',
        changeOrigin: true,
      },
    },
  },
})
