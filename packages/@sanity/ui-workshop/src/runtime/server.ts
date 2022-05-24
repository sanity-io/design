import {writeFile} from 'fs/promises'
import path from 'path'
import Debug from 'debug'
import mkdirp from 'mkdirp'
import pkgUp from 'pkg-up'
import React, {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {combineLatest, Observable, of} from 'rxjs'
import {
  distinctUntilChanged,
  map,
  mergeScan,
  scan,
  share,
  startWith,
  switchMap,
} from 'rxjs/operators'
import {createServer as createViteServer, ViteDevServer} from 'vite'
import {_compileScopes} from './_compileScopes'
import {DocumentProps} from './_document'
import {FrameProps} from './_frame'
import {_isMonorepo} from './_helpers'
import {frame_main_tsx, main_tsx} from './_templates'
import {bundle} from './bundle'
import {file} from './file'
import {createViteConfig} from './viteConfig'
import {watch} from './watch'

const debug = Debug('workshop:server')

export interface WorkspaceServer {
  listen: () => Observable<ViteDevServer | undefined>
}

export function createServer(options: {
  basePath?: string
  cwd: string
  host?: string
  port?: number
  root?: string
}): WorkspaceServer {
  const {basePath = '/', cwd, host = 'localhost', port = 3000, root: rootOption} = options

  if (!options.cwd) {
    throw new Error('missing "cwd" option')
  }

  function listen(): Observable<ViteDevServer | undefined> {
    debug('start listening ...')

    const cwd$ = of(options.cwd)
    const isMonorepo$ = cwd$.pipe(switchMap(_isMonorepo))
    const packageJsonPath$ = cwd$.pipe(switchMap((cwd) => pkgUp({cwd})))

    const rootPath$ = packageJsonPath$.pipe(
      map((packageJsonPath) => {
        if (rootOption) return path.resolve(cwd, rootOption)

        if (!packageJsonPath) {
          throw new Error('no "package.json" found')
        }

        return path.dirname(packageJsonPath)
      }),
      share()
    )

    const paths$ = rootPath$.pipe(
      switchMap(async (rootPath) => {
        debug('root', rootPath)

        const runtimePath = path.resolve(rootPath, '.workshop')

        await mkdirp(runtimePath)

        return {rootPath, runtimePath}
      }),
      share()
    )

    const documentFilename$ = rootPath$.pipe(
      switchMap((rootPath) => file({filename: path.resolve(rootPath, '_document.tsx')})),
      map((filename) => filename || path.resolve(__dirname, '_document.tsx'))
    )

    const documentComponent$: Observable<React.ComponentType<DocumentProps>> = combineLatest([
      paths$,
      documentFilename$,
    ]).pipe(
      switchMap(async ([{runtimePath}, filename]) => {
        debug('get document', filename)

        const outfile = path.resolve(runtimePath, '_document.js')

        await bundle({
          external: ['react', 'react-dom'],
          entryPoints: [filename],
          format: 'cjs',
          outfile,
        })

        return require(outfile)
      }),
      map((mod) => mod.default)
    )

    const documentHtml$: Observable<{path: string}> = combineLatest([
      paths$,
      documentComponent$,
    ]).pipe(
      switchMap(async ([{runtimePath}, documentComponent]) => {
        debug('compile document')

        try {
          const documentHtml = renderToStaticMarkup(
            createElement(documentComponent, {title: 'Workshop'})
          )

          const html = `<!DOCTYPE html>${documentHtml}`

          const filename = path.resolve(runtimePath, 'index.html')

          await writeFile(filename, html)

          return {path: filename}
        } catch (err) {
          if (err instanceof Error) {
            throw err
          } else {
            throw new Error('could not write document (.workshop/index.html)')
          }
        }
      })
    )

    const documentMain$ = paths$.pipe(
      switchMap(async ({runtimePath}) => {
        debug('write main')

        const filename = path.resolve(runtimePath, 'main.tsx')

        await writeFile(filename, main_tsx)

        return {path: filename}
      })
    )

    const frameFilename$ = rootPath$.pipe(
      switchMap((rootPath) =>
        file({
          filename: path.resolve(rootPath, '_frame.tsx'),
        })
      ),
      map((filename) => filename || path.resolve(__dirname, '_frame.tsx'))
    )

    const frameComponent$: Observable<React.ComponentType<FrameProps>> = combineLatest([
      paths$,
      frameFilename$,
    ]).pipe(
      switchMap(async ([{runtimePath}, filename]) => {
        debug('get frame component', filename)

        const outfile = path.resolve(runtimePath, '_frame.js')

        await bundle({
          external: ['react', 'react-dom'],
          entryPoints: [filename],
          format: 'cjs',
          outfile,
        })

        return require(outfile)
      }),
      map((mod) => mod.default)
    )

    const frameHtml$: Observable<{path: string}> = combineLatest([paths$, frameComponent$]).pipe(
      switchMap(async ([{runtimePath}, frameComponent]) => {
        debug('compile document')

        const filename = path.resolve(runtimePath, 'frame/index.html')

        try {
          const documentHtml = renderToStaticMarkup(createElement(frameComponent))
          const html = `<!DOCTYPE html>${documentHtml}`

          await mkdirp(path.dirname(filename))
          await writeFile(filename, html)

          return {path: filename}
        } catch (err) {
          if (err instanceof Error) {
            throw err
          } else {
            throw new Error(`could not HTML file: ${path.relative(cwd, filename)}`)
          }
        }
      })
    )

    const frameMain$ = paths$.pipe(
      switchMap(async ({runtimePath}) => {
        debug('write main')

        const filename = path.resolve(runtimePath, 'frame/main.tsx')

        await mkdirp(path.dirname(filename))
        await writeFile(filename, frame_main_tsx)

        return {path: filename}
      })
    )

    const scopesPaths$ = paths$.pipe(
      switchMap(({rootPath}) => {
        const scopesPatterns = [
          path.join(rootPath, '**/__workshop__/index.js'),
          path.join(rootPath, '**/__workshop__/index.jsx'),
          path.join(rootPath, '**/__workshop__/index.ts'),
          path.join(rootPath, '**/__workshop__/index.tsx'),
          `!**/node_modules/**`,
        ]

        debug('watch scopes', scopesPatterns)

        const event$ = watch(scopesPatterns)

        return event$.pipe(
          scan((state, event) => {
            if (event.type === 'add') {
              return state.concat([event.filename])
            }

            if (event.type === 'unlink') {
              return state.filter((f) => f !== event.filename)
            }

            return state
          }, [] as string[]),
          startWith([] as string[])
        )
      })
    )

    const scopes$ = combineLatest([paths$, scopesPaths$]).pipe(
      switchMap(async ([{runtimePath}, scopePaths]) => {
        const scopesPath = path.resolve(runtimePath, '_scopes.ts')

        await writeFile(scopesPath, _compileScopes({runtimePath, scopePaths}))

        return {path: scopesPath}
      })
    )

    const document$ = combineLatest([documentHtml$, documentMain$]).pipe(
      map(([html, main]) => ({html, main}))
    )

    const frame$ = combineLatest([frameHtml$, frameMain$]).pipe(
      map(([html, main]) => ({html, main}))
    )

    const viteConfig$ = combineLatest([cwd$, isMonorepo$, paths$, document$, frame$, scopes$]).pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      map(([cwd, isMonorepo, paths, document, frame, scopes]) => {
        debug('get vite config', {
          cwd,
          isMonorepo,
          paths,
          document,
          frame,
          scopes,
        })

        return createViteConfig({
          basePath,
          runtimePath: paths.runtimePath,
          cwd,
          isMonorepo: isMonorepo,
        })
      }),
      share()
    )

    const viteServer$: Observable<ViteDevServer | undefined> = viteConfig$.pipe(
      mergeScan(async (viteServer: ViteDevServer | undefined, viteConfig) => {
        debug('get vite server')

        if (viteServer) {
          debug('close vite server')

          await viteServer.close()
        }

        viteServer = await createViteServer({
          ...viteConfig,
          configFile: false,
          mode: 'development',
          server: {
            host,
            port,
          },
        })

        await viteServer.listen()

        return viteServer
      }, undefined),
      share()
    )

    return viteServer$.pipe(
      map((viteServer) => {
        if (!viteServer) return

        const {host, port} = viteServer.config.server

        // eslint-disable-next-line no-console
        console.log(`workshop running at http://${host}:${port}`)

        return viteServer
      })
    )
  }

  return {listen}
}
