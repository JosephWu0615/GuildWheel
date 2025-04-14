/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,          // ✅ THIS enables describe/it/etc.
    environment: 'node',    // ✅ For Express, DB, etc.
  },
})
