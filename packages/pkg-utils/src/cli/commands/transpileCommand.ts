import path from 'path'
import {transpile} from '../../transpile'
import {ChunkTarget} from '../../types'

/**
 * Transpile a Sanity package
 *
 * - Output files to `lib/` in each package
 * - Transpile each file
 * - Compile TS definitions to `lib/dts/`
 */
export async function transpileCommand(opts: {
  cwd: string
  target: ChunkTarget
  tsconfig?: string
  watch: boolean
}): Promise<void> {
  const {target, tsconfig = 'tsconfig.json', watch} = opts

  const cwd = path.resolve(process.cwd(), opts.cwd || '.')

  if (watch) {
    await transpile.watch({cwd, target, tsconfig})
  } else {
    await transpile.build({cwd, target, tsconfig})
  }
}
