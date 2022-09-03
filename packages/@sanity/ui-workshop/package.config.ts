import {defineConfig} from '@sanity/pkg-utils'

export default defineConfig({
  extract: {
    rules: {
      'ae-forgotten-export': 'off',
      'ae-missing-release-tag': 'off',
    },
  },
})
