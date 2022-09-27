import {defineConfig} from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 60000,
  e2e: {
    baseUrl: 'http://localhost:9009',
  },
})
