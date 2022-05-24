/* eslint-disable no-console */

import path from 'path'
import {cac} from 'cac'
import chalk from 'chalk'
import {build, Chunk, ChunkModule} from './runtime/build'
import {dev} from './runtime/dev'

interface BuildOptions {
  outDir?: string
  stats?: boolean
  target?: 'modules'
}

interface DevOptions {
  host?: string
  port?: number
}

const cli = cac('workshop')

// workshop build
cli
  .command('build [root]', 'build for production')
  .option('--outDir <dir>', `[string] output directory (default: dist)`)
  .option('--stats', 'Stats')
  .option('--target <target>', `[string] transpile target (default: 'modules')`)
  .action(async (root: string, options: BuildOptions) => {
    const cwd = process.cwd()

    const result = await build({
      basePath: '/',
      cwd,
      outDir: path.resolve(cwd, options.outDir || 'dist'),
      root,
      target: options.target,
    })

    if (options.stats) {
      console.log('Stats')
      console.log('')
      console.log('The 50 largest modules in this project:')
      console.log(formatModuleSizes(sortModulesBySize(result.chunks).slice(0, 50)))
    }
  })

function sortModulesBySize(chunks: Chunk[]): ChunkModule[] {
  return chunks
    .flatMap((chunk) => chunk.modules)
    .sort((modA, modB) => modB.renderedLength - modA.renderedLength)
}

function formatModuleSizes(modules: ChunkModule[]): string {
  const lines = []

  for (const mod of modules) {
    lines.push(` - ${formatModuleName(mod.name)} (${formatSize(mod.renderedLength)})`)
  }

  return lines.join('\n')
}

function formatModuleName(modName: string): string {
  const delimiter = 'node_modules/'
  const nodeIndex = modName.lastIndexOf(delimiter)

  return nodeIndex === -1 ? modName : modName.slice(nodeIndex + delimiter.length)
}

function formatSize(bytes: number): string {
  return chalk.cyan(`${(bytes / 1024).toFixed()} kB`)
}

// workshop dev
cli
  .command('dev [root]', 'start dev server')
  .option('--host [host]', `[string] specify hostname`)
  .option('--port [port]', `[number] specify port`)
  .action((root, options: DevOptions) => {
    dev({cwd: process.cwd(), host: options.host, port: options.port, root})
  })

// workshop -h
cli.help()

// workshop -v
cli.version(
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../package.json').version
)

cli.parse()
