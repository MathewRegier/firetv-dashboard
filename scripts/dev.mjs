/**
 * Runs Vite + calendar API together (replaces concurrently; avoids broken rxjs installs on Windows).
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const viteCli = path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')

const opts = {
  stdio: 'inherit',
  cwd: root,
  env: { ...process.env },
}

const web = spawn(process.execPath, [viteCli], opts)
const api = spawn(process.execPath, ['server/index.js'], opts)

let shuttingDown = false

function shutdown(code = 0) {
  if (shuttingDown) return
  shuttingDown = true
  try {
    web.kill('SIGTERM')
  } catch {
    /* ignore */
  }
  try {
    api.kill('SIGTERM')
  } catch {
    /* ignore */
  }
  setTimeout(() => process.exit(code), 100)
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))

web.on('exit', (code) => {
  if (!shuttingDown) shutdown(code ?? 0)
})
api.on('exit', (code) => {
  if (!shuttingDown) shutdown(code ?? 0)
})
