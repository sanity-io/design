/* eslint-disable no-console */

import {ChildProcess, exec, spawn} from 'child_process'
import path from 'path'

const WORKSHOP_PATH = path.resolve(__dirname, '../../../apps/workshop')

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

  function dev() {
    return spawn('yarn dev', {
      cwd: WORKSHOP_PATH,
      env: {
        DEBUG: debug ? '1' : undefined,
        PORT: port ? String(port) : undefined,
        PATH: process.env.PATH,
      },
      shell: true,
      stdio: debug ? 'inherit' : undefined,
    })
  }

  function start(): Promise<ChildProcess> {
    return new Promise((resolve, reject) => {
      exec(
        'yarn build',
        {
          cwd: WORKSHOP_PATH,
          env: {
            DEBUG: debug ? '1' : undefined,
            PATH: process.env.PATH,
          },
        },
        () => {
          const child = spawn('yarn start', {
            cwd: WORKSHOP_PATH,
            env: {
              DEBUG: debug ? '1' : undefined,
              PATH: process.env.PATH,
            },
            shell: true,
          })

          if (!child.stdout) {
            return reject(new Error('no stdout'))
          }

          child.stdout.on('data', (chunk) => {
            const d = String(chunk)

            process.stdout.write(chunk)

            if (d.includes('$ http-server')) {
              resolve(child)
            }
          })

          child.stderr.on('data', (chunk) => {
            process.stderr.write(chunk)
          })

          child.on('error', (err) => {
            reject(err)
          })
        }
      )
    })
  }

  const child = build ? await start() : dev()

  child.on('close', (code) => {
    onExit?.(code)
  })

  child.on('error', () => {
    console.log(`[server] error`)
  })

  async function close() {
    child.kill()
  }

  return {close, port}
}
