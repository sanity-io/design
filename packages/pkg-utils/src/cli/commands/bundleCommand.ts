import path from 'path'
import {bundle} from '../../bundle'
import {ChunkTarget} from '../../types'
import {validateCommand} from './validateCommand'

/**
 * Bundle a Sanity package
 *
 * - Output files to `lib/` in each package
 * - Bundle files to 1 file.
 * - Support multiple exports per package.
 * - Compile TS definitions to `lib/dts/`
 */
export async function bundleCommand(opts: {
  cwd: string
  target?: ChunkTarget
  tsconfig?: string
  validate: boolean
  watch: boolean
}): Promise<void> {
  const {target = 'web', tsconfig = 'tsconfig.json', validate, watch} = opts
  const cwd = path.resolve(process.cwd(), opts.cwd || '.')

  if (watch) {
    await bundle.watch({cwd, target, tsconfig})
  } else {
    await bundle.build({cwd, target, tsconfig})
  }

  if (validate) {
    await validateCommand({cwd})
  }
}
