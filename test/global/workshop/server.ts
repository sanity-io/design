import {ChildProcess} from 'child_process'
import path from 'path'
import {filter, switchMap} from 'rxjs/operators'
import {_spawn} from './_spawn'

const ROOT_PATH = path.resolve(__dirname, '../../..')

export interface WorkshopServer {
  close: () => Promise<void>
  port: number
}

export async function startWorkshopServer(opts: {
  build?: boolean
  debug: boolean
  onExit?: (code: number | null) => void
  port: number
}): Promise<WorkshopServer> {
  const {build, debug, onExit, port} = opts

  function dev(): Promise<{child: ChildProcess}> {
    return new Promise((resolve, reject) => {
      const dev$ = _spawn(`bin/workshop`, ['dev', `--port ${port}`], {
        cwd: ROOT_PATH,
        env: {
          ...process.env,
          DEBUG: debug ? '1' : undefined,
          PORT: port ? String(port) : undefined,
        },
        shell: true,
      })

      let isResolved = false

      dev$.subscribe({
        error(error) {
          reject(error)
        },
        next({child, chunk}) {
          if (!isResolved) {
            const d = String(chunk)

            if (d.includes('workshop running at')) {
              resolve({child})

              isResolved = true
            }
          }
        },
      })
    })
  }

  function start() {
    const build$ = _spawn('yarn', ['build'], {
      cwd: ROOT_PATH,
      env: {
        ...process.env,
        DEBUG: debug ? '1' : undefined,
      },
    })

    const start$ = _spawn('yarn', ['start'], {
      cwd: ROOT_PATH,
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
