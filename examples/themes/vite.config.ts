import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import {defineConfig} from 'vite'

const ROOT_PATH = path.resolve(__dirname, '../..')

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'public'),
  },
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: '@sanity/color',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/color/src'),
      },
      {
        find: '@sanity/icons',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/icons/src'),
      },
      {
        find: '@sanity/logos',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/logos/src'),
      },
      {
        find: '@sanity/ui',
        replacement: path.resolve(ROOT_PATH, 'packages/@sanity/ui/src'),
      },
      {
        find: 'react',
        replacement: require.resolve('react'),
      },
      {
        find: 'react-dom',
        replacement: require.resolve('react-dom'),
      },
      {
        find: 'styled-components',
        replacement: require.resolve('styled-components'),
      },
    ],
  },
  root: path.resolve(__dirname, 'src'),
  server: {
    port: 3001,
  },
})
