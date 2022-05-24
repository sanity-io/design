import {writeFile} from 'fs/promises'
import path from 'path'
import {promisify} from 'util'
import {copy as _copy} from 'cpx'
import globby from 'globby'
import mkdirp from 'mkdirp'
import pkgUp from 'pkg-up'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {build as viteBuild, UserConfig as ViteConfig} from 'vite'
import {isArray} from '../lib/isArray'
import {_compileScopes} from './_compileScopes'
import {getExists, _isMonorepo} from './_helpers'
import {frame_main_tsx, main_tsx} from './_templates'
import {bundle} from './bundle'
import {createViteConfig} from './viteConfig'

const copy = promisify(_copy)

export interface ChunkModule {
  name: string
  originalLength: number
  renderedLength: number
}

export interface Chunk {
  name: string
  modules: ChunkModule[]
}

async function _buildDocumentComponent(options: {
  rootPath: string
  runtimePath: string
}): Promise<React.ComponentType<{title: string}>> {
  const {rootPath, runtimePath} = options
  const customDocumentPath = path.resolve(rootPath, '_document.tsx')
  const customDocumentExists = await getExists(customDocumentPath)
  const documentPath = customDocumentExists
    ? customDocumentPath
    : path.resolve(__dirname, '_document.tsx')

  const outfile = path.resolve(runtimePath, '_document.js')

  await bundle({
    external: ['react', 'react-dom'],
    entryPoints: [documentPath],
    format: 'cjs',
    outfile,
  })

  // eslint-disable-next-line
  return require(outfile).default
}

async function _buildFrameComponent(options: {rootPath: string; runtimePath: string}) {
  const {rootPath, runtimePath} = options
  const customDocumentPath = path.resolve(rootPath, '_frame.tsx')
  const customDocumentExists = await getExists(customDocumentPath)
  const documentPath = customDocumentExists
    ? customDocumentPath
    : path.resolve(__dirname, '_frame.tsx')

  const outfile = path.resolve(runtimePath, '_frame.js')

  await bundle({
    external: ['react', 'react-dom'],
    entryPoints: [documentPath],
    format: 'cjs',
    outfile,
  })

  // eslint-disable-next-line
  return require(outfile).default
}

export async function build(options: {
  basePath: string
  cwd: string
  logLevel?: 'error' | 'warn' | 'info'
  mode?: string
  outDir: string
  root?: string
  target?: 'modules'
}): Promise<{chunks: Chunk[]}> {
  const {
    basePath,
    cwd,
    logLevel = 'silent',
    mode = 'production',
    outDir,
    root: rootOption,
    target = 'modules',
  } = options

  const isMonorepo = await _isMonorepo(cwd)
  const packageJsonPath = await pkgUp({cwd})

  if (!packageJsonPath) {
    throw new Error('no "package.json" found')
  }

  const rootPath = rootOption ? path.resolve(cwd, rootOption) : path.dirname(packageJsonPath)

  // const packagePath = path.dirname(packageJsonPath)
  const runtimePath = path.resolve(rootPath, '.workshop')

  // make directories
  await mkdirp(runtimePath)
  await mkdirp(path.resolve(runtimePath, 'frame'))

  // render document component
  const documentComponent = await _buildDocumentComponent({rootPath, runtimePath})
  const documentHtml = renderToStaticMarkup(createElement(documentComponent, {title: 'Workshop'}))

  await writeFile(path.resolve(runtimePath, 'index.html'), `<!DOCTYPE html>${documentHtml}`)

  // render main
  await writeFile(path.resolve(runtimePath, 'main.tsx'), main_tsx)

  // render frame component
  const frameComponent = await _buildFrameComponent({rootPath, runtimePath})
  const frameHtml = renderToStaticMarkup(createElement(frameComponent, {title: 'Workshop'}))

  await writeFile(path.resolve(runtimePath, 'frame/index.html'), `<!DOCTYPE html>${frameHtml}`)

  // render frame main
  await writeFile(path.resolve(runtimePath, 'frame/main.tsx'), frame_main_tsx)

  // write scopes
  const scopesPatterns = [
    path.join(rootPath, '**/__workshop__/index.js'),
    path.join(rootPath, '**/__workshop__/index.jsx'),
    path.join(rootPath, '**/__workshop__/index.ts'),
    path.join(rootPath, '**/__workshop__/index.tsx'),
    `!**/node_modules/**`,
  ]

  const scopePaths = await globby(scopesPatterns)
  const scopesPath = path.resolve(runtimePath, '_scopes.ts')

  await writeFile(scopesPath, _compileScopes({runtimePath, scopePaths}))

  const viteConfig: ViteConfig = createViteConfig({basePath, runtimePath, cwd, isMonorepo})

  const result = await viteBuild({
    ...viteConfig,
    build: {...viteConfig.build, outDir, target},
    configFile: false,
    logLevel,
    mode,
  })

  // Copy index.html to root
  await copy(path.resolve(rootPath, 'dist/.workshop/index.html'), path.resolve(rootPath, 'dist'))

  // For typescript only - this shouldn't ever be the case given we're not watching
  if (isArray(result) || !('output' in result)) {
    return {chunks: []}
  }

  const chunks: Chunk[] = []

  result.output.forEach((chunk) => {
    if (chunk.type !== 'chunk') {
      return
    }

    chunks.push({
      name: chunk.name,
      modules: Object.entries(chunk.modules).map(([rawFilePath, chunkModule]) => {
        const filePath = rawFilePath.startsWith('\x00')
          ? rawFilePath.slice('\x00'.length)
          : rawFilePath

        return {
          name: path.isAbsolute(filePath) ? path.relative(cwd, filePath) : filePath,
          originalLength: chunkModule.originalLength,
          renderedLength: chunkModule.renderedLength,
        }
      }),
    })
  })

  return {chunks}
}
