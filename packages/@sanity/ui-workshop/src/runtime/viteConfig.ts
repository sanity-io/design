import path from 'path'
import viteReact from '@vitejs/plugin-react'
import {Plugin, UserConfig as ViteConfig} from 'vite'

const MONOREPO_PATH = path.resolve(__dirname, '../../../../..')

const MONOREPO_ALIASES = {
  '@sanity/color': path.resolve(MONOREPO_PATH, 'packages/@sanity/color/src'),
  '@sanity/icons': path.resolve(MONOREPO_PATH, 'packages/@sanity/icons/src'),
  '@sanity/logos': path.resolve(MONOREPO_PATH, 'packages/@sanity/logos/src'),
  '@sanity/ui': path.resolve(MONOREPO_PATH, 'packages/@sanity/ui/src'),
  '@sanity/ui-workshop': path.resolve(MONOREPO_PATH, 'packages/@sanity/ui-workshop/src'),
}

export function createViteConfig(options: {
  basePath: string
  cwd: string
  runtimePath: string
  isMonorepo: boolean
}): ViteConfig {
  const {basePath, cwd, runtimePath, isMonorepo} = options

  const input = {
    'workshop/index': path.resolve(runtimePath, 'index.html'),
    'workshop/frame': path.resolve(runtimePath, 'frame/index.html'),
  }

  function _runtimeMiddleware(): Plugin {
    return {
      name: '_runtimeMiddleware',
      apply: 'serve',
      configureServer(viteDevServer) {
        return () => {
          viteDevServer.middlewares.use((req, _res, next) => {
            if (req.url === '/index.html') {
              req.url = '/.workshop/index.html'
            }

            next()
          })
        }
      },
    }
  }

  return {
    base: basePath,
    build: {
      rollupOptions: {
        input,
      },
    },
    envPrefix: 'WORKSHOP_',
    plugins: [viteReact(), _runtimeMiddleware()],
    root: cwd,
    resolve: {
      alias: {
        ...(isMonorepo ? MONOREPO_ALIASES : {}),
      },
    },
    server: {
      fs: {
        allow: isMonorepo ? [MONOREPO_PATH] : [cwd],
      },
    },
  }
}
