/* eslint-disable no-console */

import {ChildProcess, spawn, SpawnOptions} from 'child_process'
import path from 'path'
import {Observable} from 'rxjs'
import {filter, switchMap} from 'rxjs/operators'

const WORKSHOP_PATH = path.resolve(__dirname, '../../../apps/workshop')

export interface WorkshopServer {
  close: () => Promise<void>
  port: number
}

function _spawn(
  command: string,
  options: SpawnOptions
): Observable<{child: ChildProcess; chunk?: Buffer}> {
  return new Observable((observer) => {
    const child = spawn(command, options)

    console.log(`$ ${command}`)

    child.stdout?.on('data', (chunk) => {
      observer.next({child, chunk})
    })

    child.on('error', (error) => {
      console.log('error', {error})
      observer.error(error)
    })

    child.on('close', (code, signal) => {
      console.log('close', {code, signal})
      observer.complete()
    })

    child.on('disconnect', () => {
      console.log('disconnect')
      observer.complete()
    })

    child.on('exit', (code) => {
      console.log('exit', {code})
      observer.complete()
      process.exit(code || 0)
    })

    child.on('message', (msg, _send) => {
      console.log('message', {msg})
    })

    child.on('spawn', () => {
      console.log('spawn')
      observer.next({child})
    })

    return () => {
      child.kill()
    }
  })
}

export async function startWorkshopServer(opts: {
  build?: boolean
  debug: boolean
  onExit?: (code: number | null) => void
  port: number
}): Promise<WorkshopServer> {
  const {build, debug, onExit, port} = opts

  function dev() {
    const dev$ = _spawn('yarn dev', {
      cwd: WORKSHOP_PATH,
      env: {
        ...process.env,
        DEBUG: debug ? '1' : undefined,
        PORT: port ? String(port) : undefined,
      },
      shell: true,
    })

    const devIsRunning$ = dev$.pipe(
      filter(({chunk}) => {
        const d = String(chunk)

        return d.includes('dev server running')
      })
    )

    return devIsRunning$.toPromise()
  }

  function start() {
    const build$ = _spawn('yarn build', {
      cwd: WORKSHOP_PATH,
      env: {
        ...process.env,
        DEBUG: debug ? '1' : undefined,
      },
    })

    const start$ = _spawn('yarn start', {
      cwd: WORKSHOP_PATH,
      env: {
        ...process.env,
        DEBUG: debug ? '1' : undefined,
      },
    })

    const serverIsRunning$ = build$.pipe(
      switchMap(() => start$),
      filter(({chunk}) => {
        const d = String(chunk)

        return d.includes('$ http-server')
      })
    )

    return serverIsRunning$.toPromise()
  }

  const {child} = build ? await start() : await dev()

  child.on('close', (code) => {
    onExit?.(code)
  })

  async function close() {
    child.kill()
  }

  return {close, port}
}
