import {writeFile} from 'fs/promises'
import path from 'path'
import {bundle} from '@swc/core'
import mkdirp from 'mkdirp'

async function build(opts: {
  cwd: string
  entries: {name: string; input: string; output: string}[]
  outDir: string
}) {
  const len = opts.entries.length

  const result = await bundle(
    opts.entries.map((entry) => {
      return {
        entry: entry.input,
        output: {name: entry.name, path: entry.output},
        mode: 'production',
        module: {},
        target: 'browser',
        workingDir: opts.cwd,
        externalModules: ['framer-motion', 'react', 'react-dom', 'react-is', 'styled-components'],
        options: {
          cwd: opts.cwd,
          filename: entry.input,
          jsc: {
            externalHelpers: false,
            parser: {
              syntax: 'typescript',
              tsx: true,
              decorators: false,
              dynamicImport: false,
            },
            target: 'es2020',
          },
          isModule: true,
          minify: true,
          outputPath: opts.outDir,
          sourceMaps: true,
          swcrc: false,
        },
      }
    })
  )

  const resultEntries = Object.entries(result)

  for (let i = 0; i < len; i += 1) {
    const entry = opts.entries[i]
    const name = resultEntries[i][0]
    const chunk = resultEntries[i][1]

    console.log(`=== ${name} ===`)

    for (const [key, value] of Object.entries(chunk)) {
      console.log(key, typeof value === 'string' ? `length=${value.length}` : typeof value)
    }

    console.log('output (js)', path.relative(opts.cwd, entry.output))
    console.log('output (map)', path.relative(opts.cwd, entry.output + '.map'))

    await mkdirp(path.dirname(entry.output))

    await writeFile(entry.output, chunk.code)

    if (chunk.map) {
      await writeFile(entry.output + '.map', chunk.map)
    }
  }
}

async function main() {
  await build({
    cwd: path.resolve(__dirname, '../../packages/@sanity/ui/'),
    outDir: path.resolve(__dirname, '../../packages/@sanity/ui/lib/swc/'),
    entries: [
      {
        name: 'index',
        input: path.resolve(__dirname, '../../packages/@sanity/ui/src/index.ts'),
        output: path.resolve(__dirname, '../../packages/@sanity/ui/lib/swc/index.js'),
      },
    ],
  })
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
