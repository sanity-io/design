import {build, BuildResult, Format, Platform} from 'esbuild'

export function bundle(options: {
  entryPoints?: string[]
  external?: string[]
  format?: Format
  inject?: string[]
  outfile?: string
  platform?: Platform
  sourcefile?: string
}): Promise<BuildResult> {
  try {
    return build({
      bundle: true,
      entryPoints: options.entryPoints,
      external: options.external,
      format: options.format || 'cjs',
      inject: options.inject,
      outfile: options.outfile,
      platform: options.platform,
    })
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`bundle error: ${err.message}`)
    } else {
      throw new Error(`bundle error: ${err}`)
    }
  }
}
