/* eslint-disable no-console */

import {readFile} from 'fs/promises'
import path from 'path'
import {sync as getBrotliSize} from 'brotli-size'
import chalk from 'chalk'
import prettyBytes from 'pretty-bytes'
import {RollupError} from 'rollup'
import {SUPPORTED_TARGETS} from '../constants'
import {resolveTsconfigPath} from '../helpers'
import {ChunkTarget} from '../types'
import {TERM_DIVIDER} from './constants'
import {_resolveExternal, _resolveInputs} from './helpers'
import {rollupBundle} from './rollup/rollupBundle'

export async function build(opts: {
  cwd: string
  target: ChunkTarget
  tsconfig: string
}): Promise<void> {
  const {cwd, target, tsconfig} = opts

  if (!cwd.includes('packages/')) {
    throw new Error('must be in package')
  }

  if (!SUPPORTED_TARGETS.includes(target)) {
    throw new Error(`unsupported target: "${target}"`)
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(path.resolve(cwd, 'package.json'))

  console.log(TERM_DIVIDER)
  console.log(
    [
      `${chalk.blue('package ')}`,
      `      `,
      `${chalk.green(pkg.name)}${chalk.magenta('@')}${chalk.green(pkg.version)}`,
    ].join('')
  )
  console.log(`${chalk.blue('mode')}          ${chalk.green('bundle')}`)
  console.log(`${chalk.blue('target')}        ${chalk.green(target)}`)

  const tsconfigPath = resolveTsconfigPath({cwd, tsconfig})

  if (tsconfigPath) {
    console.log(`${chalk.blue('tsconfig')}      ${chalk.green(path.relative(cwd, tsconfigPath))}`)
  }

  console.log('')

  const external = _resolveExternal({pkg})
  const outDir = path.resolve(cwd, 'lib')
  const inputs = _resolveInputs(pkg)

  try {
    const commonOpts = {
      cwd,
      external,
      target,
    }

    const [modernFiles, moduleFiles, commonjsFiles] = await Promise.all([
      // *.modern.js
      rollupBundle({
        ...commonOpts,
        build: {format: 'esm-modern', outDir, target},
        input: inputs.modern,
        tsconfig: tsconfigPath,
      }),
      // *.module.js
      rollupBundle({
        ...commonOpts,
        build: {format: 'esm', outDir, target},
        input: inputs.module,
        tsconfig: tsconfigPath,
      }),
      // *.js (commonjs)
      rollupBundle({
        ...commonOpts,
        build: {format: 'commonjs', outDir, target},
        input: inputs.commonjs,
        tsconfig: tsconfigPath,
      }),
    ])

    const files = [...modernFiles, ...moduleFiles, ...commonjsFiles]

    for (const file of files) {
      const fileContents = await readFile(path.relative(cwd, file.path))
      const size = getBrotliSize(fileContents.toString())

      console.log(
        [
          `${chalk.magenta(file.type)}`,
          `         `,
          `${chalk.green(path.relative(cwd, file.path))} (br: ${formatSize(size)})`,
        ].join('')
      )
    }
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

  console.log(TERM_DIVIDER)
}

function formatSize(size: number) {
  const pretty = prettyBytes(size)
  const color = size < 5000 ? chalk.green : size > 40000 ? chalk.red : chalk.yellow

  return `${color(pretty)}`
}
