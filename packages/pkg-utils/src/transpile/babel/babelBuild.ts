import {writeFile} from 'fs/promises'
import path from 'path'
import {BabelFileResult, transformFileAsync, TransformOptions} from '@babel/core'
import mkdirp from 'mkdirp'
import {getBabelConfig} from '../../babel'
import {ChunkFormat} from '../../types'
import {_isBabelFileResultWithOptions} from './helpers'

export const FORMAT_DIR: Record<ChunkFormat, string> = {
  commonjs: 'cjs',
  esm: 'esm',
  'esm-modern': 'esm',
}

export async function babelBuild(opts: {
  cwd: string
  files: string[]
  sourceRootPath: string
  format: ChunkFormat
  target: 'node' | 'web'
  watch?: boolean
}): Promise<Array<{srcPath: string; libPath: string} | null>> {
  const {cwd, files, sourceRootPath, format, target} = opts
  const outDir = path.resolve(cwd, target === 'web' ? `lib/${FORMAT_DIR[format]}` : 'lib')
  const babelConfig = getBabelConfig({format, target})

  const transpiled: Array<BabelFileResult | null> = await Promise.all(
    files.map((file): Promise<BabelFileResult | null> => _handleFile(file, {babelConfig}))
  )

  const outputs = await Promise.all(
    transpiled.map((result) => _writeCompiledFile(result, {sourceRootPath, outDir}))
  )

  return outputs
}

function _handleFile(
  file: string,
  opts: {babelConfig: TransformOptions}
): Promise<BabelFileResult | null> {
  return transformFileAsync(file, {
    babelrc: false,
    ...opts.babelConfig,
    caller: {
      name: 'pkg-utils',
      supportsStaticESM: false,
    },
  })
}

async function _writeCompiledFile(
  result: BabelFileResult | null,
  opts: {sourceRootPath: string; outDir: string}
): Promise<{srcPath: string; libPath: string} | null> {
  if (!result || !_isBabelFileResultWithOptions(result)) {
    return null
  }

  const srcPath = result.options.filename
  const libPath = path
    .resolve(opts.outDir, path.relative(opts.sourceRootPath, srcPath))
    .replace(/\.(ts|tsx)+$/, '.js')

  const dirPath = path.dirname(libPath)

  await mkdirp(dirPath)
  await writeFile(libPath, result.code || '')

  return {srcPath, libPath}
}
