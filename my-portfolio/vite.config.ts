import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execFileSync } from 'node:child_process'

function getLastUpdatedDate() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cs'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __LAST_UPDATED__: JSON.stringify(getLastUpdatedDate()),
  },
})
