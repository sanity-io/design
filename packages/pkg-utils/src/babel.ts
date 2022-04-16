import {TransformOptions} from '@babel/core'
import {babelConfig, babelTargets} from './config'
import {ChunkFormat, ChunkTarget} from './types'

const DEBUG = false

/**
 * Get Babel config to use for either `bundle` or `transpile` builds.
 */
export function getBabelConfig(opts: {
  format?: ChunkFormat
  target: ChunkTarget
}): Omit<TransformOptions, 'include' | 'exclude'> {
  const {format = 'commonjs', target} = opts

  return {
    ...babelConfig,
    presets: babelConfig.presets.map((preset) => {
      if (preset === '@babel/preset-env') {
        if (format === 'esm-modern') {
          return [
            '@babel/preset-env',
            {
              debug: DEBUG,
              loose: true,
              useBuiltIns: false,
              modules: false,
              targets: babelTargets.modern,
            },
          ]
        }

        if (target === 'node') {
          return [
            '@babel/preset-env',
            {
              debug: DEBUG,
              loose: true,
              useBuiltIns: false,
              modules: false,
              targets: babelTargets.node,
            },
          ]
        }

        // target: `web`
        // format: `esm` or `commonjs`
        return [
          '@babel/preset-env',
          {
            debug: DEBUG,
            loose: true,
            useBuiltIns: false,
            modules: false,
            targets: babelTargets.web,
          },
        ]
      }

      return preset
    }),
  }
}
