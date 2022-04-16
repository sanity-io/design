/* eslint-disable no-console */

import path from 'path'
import chalk from 'chalk'
import {RollupError} from 'rollup'
import {resolveTsconfigPath} from '../helpers'
import {ChunkTarget} from '../types'
import {_resolveExternal, _resolveInputs} from './helpers'
import {rollupBundle} from './rollup/rollupBundle'

export async function watch(opts: {
  cwd: string
  target: ChunkTarget
  tsconfig: string
}): Promise<void> {
  const {cwd, target, tsconfig} = opts

  if (!cwd.includes('packages/')) {
    throw new Error('must be in package')
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(path.resolve(cwd, 'package.json'))

  console.log(`${chalk.blue('watch')} ${pkg.name}@${pkg.version}`)

  const tsconfigPath = resolveTsconfigPath({cwd, tsconfig})
  const external = _resolveExternal({pkg})
  const outDir = path.resolve(cwd, 'lib')
  const inputs = _resolveInputs(pkg)

  try {
    await Promise.all([
      // *.modern.js
      rollupBundle({
        build: {
          format: 'esm-modern',
          outDir,
          target,
        },
        cwd,
        external,
        input: inputs.modern,
        tsconfig: tsconfigPath,
        watch: true,
      }),
      // *.module.js
      rollupBundle({
        build: {
          format: 'esm',
          outDir,
          target,
        },
        cwd,
        external,
        input: inputs.module,
        tsconfig: tsconfigPath,
        watch: true,
      }),
      // *.js (commonjs)
      rollupBundle({
        build: {
          format: 'commonjs',
          outDir,
          target,
        },
        cwd,
        external,
        input: inputs.commonjs,
        tsconfig: tsconfigPath,
        watch: true,
      }),
    ])
  } catch (err) {
    const bundleError = err as RollupError

    if (bundleError.code === 'PARSE_ERROR') {
      console.error(chalk.red(bundleError.parserError))
      console.error(
        [
          `${chalk.cyan(bundleError.loc?.file)}`,
          `:${chalk.yellow(bundleError.loc?.line)}:${chalk.yellow(bundleError.loc?.column)}`,
        ].join('')
      )

      console.error(chalk.yellow(bundleError.frame))
    } else {
      console.error(bundleError)
    }

    throw new Error('build failed')
  }
}
