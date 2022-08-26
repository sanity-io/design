import path from 'path'
import {createCliConfig} from 'sanity/cli'
import {UserConfig} from 'vite'

const ROOT_PATH = path.resolve(__dirname, '../..')

function _toArray<T>(t: T | T[]): T[] {
  return Array.isArray(t) ? t : [t]
}

export default createCliConfig({
  vite: (viteConfig: UserConfig): UserConfig => {
    const browserEnv = Object.fromEntries(
      Object.entries(process.env).filter(
        ([key]) =>
          viteConfig.envPrefix && _toArray(viteConfig.envPrefix).some((str) => key.startsWith(str))
      )
    )

    return {
      ...viteConfig,

      define: {
        ...viteConfig?.define,
        'process.env': browserEnv,
      },

      resolve: {
        ...viteConfig.resolve,
        alias: {
          ...viteConfig.resolve?.alias,
          '@sanity/color': path.resolve(ROOT_PATH, 'packages/@sanity/color/src'),
          '@sanity/icons': path.resolve(ROOT_PATH, 'packages/@sanity/icons/src'),
          '@sanity/logos': path.resolve(ROOT_PATH, 'packages/@sanity/logos/src'),
          '@sanity/ui': path.resolve(ROOT_PATH, 'packages/@sanity/ui/src'),
        },
      },
    }
  },
})
