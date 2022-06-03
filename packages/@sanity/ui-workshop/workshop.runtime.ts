import path from 'path'
import {defineRuntime} from './src'

export default defineRuntime({
  vite(viteConfig) {
    return {
      ...viteConfig,
      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...viteConfig.resolve.alias,
          '@sanity/ui-workshop': path.resolve(__filename, 'src'),
        },
      },
    }
  },
})
