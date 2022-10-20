import path from 'path'
import {defineConfig, perfPlugin} from '../ui-workshop/src/core'

const __BROWSER__ = typeof window !== 'undefined'

const alias = __BROWSER__
  ? undefined
  : {
      '@sanity/ui-workshop': __BROWSER__ ? '' : path.resolve(__dirname, '../ui-workshop/src/core'),

      '@sanity/color': __BROWSER__ ? '' : path.resolve(__dirname, 'packages/@sanity/color/src'),
      '@sanity/icons': __BROWSER__ ? '' : path.resolve(__dirname, 'packages/@sanity/icons/src'),
      '@sanity/logos': __BROWSER__ ? '' : path.resolve(__dirname, 'packages/@sanity/logos/src'),
      '@sanity/ui': __BROWSER__ ? '' : path.resolve(__dirname, 'packages/@sanity/ui/src'),
    }

export default defineConfig({
  alias,
  collections: [
    {
      name: 'components',
      title: 'Components',
    },
    {
      name: 'hooks',
      title: 'Hooks',
    },
    {
      name: 'primitives',
      title: 'Primitives',
    },
    {
      name: 'utils',
      title: 'Utils',
    },
  ],
  pattern: ['**/__workshop__/index.ts', '**/__workshop__/index.tsx'],
  plugins: [perfPlugin()],
  title: 'Sanity UI',
})
