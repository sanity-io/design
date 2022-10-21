import path from 'path'
import {defineConfig} from '@sanity/ui-workshop'
import {perfPlugin} from '@sanity/ui-workshop/perf-plugin'

export default defineConfig({
  alias: getAliases(),
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
  pattern: [
    'apps/**/__workshop__/index.ts',
    'apps/**/__workshop__/index.tsx',
    'examples/**/__workshop__/index.ts',
    'examples/**/__workshop__/index.tsx',
    'packages/**/__workshop__/index.ts',
    'packages/**/__workshop__/index.tsx',
  ],
  plugins: [perfPlugin()],
  port: 9009,
  title: 'Sanity UI',
})

function getAliases() {
  if (typeof window !== 'undefined') return undefined

  return {
    '@sanity/ui-workshop/plugin-a11y': path.resolve(
      __dirname,
      'node_modules/@sanity/ui-workshop/src/plugin-a11y'
    ),
    '@sanity/ui-workshop/plugin-perf': path.resolve(
      __dirname,
      'node_modules/@sanity/ui-workshop/src/plugin-perf'
    ),
    '@sanity/ui-workshop': path.resolve(__dirname, 'node_modules/@sanity/ui-workshop/src/core'),
    '@sanity/color': path.resolve(__dirname, 'packages/@sanity/color/src'),
    '@sanity/icons': path.resolve(__dirname, 'packages/@sanity/icons/src'),
    '@sanity/logos': path.resolve(__dirname, 'packages/@sanity/logos/src'),
    '@sanity/ui': path.resolve(__dirname, 'packages/@sanity/ui/src'),
  }
}
