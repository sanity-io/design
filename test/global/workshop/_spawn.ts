import {ChildProcess, spawn, SpawnOptions} from 'child_process'
import {Observable} from 'rxjs'

export function _spawn(
  command: string,
  args: string[],
  options: SpawnOptions
): Observable<{child: ChildProcess; chunk?: Buffer}> {
  return new Observable((observer) => {
    // eslint-disable-next-line no-console
    console.log(`$ ${command} ${args.join(' ')}`)

    const child = spawn(command, args, options)

    child.stdout?.on('data', (chunk: Buffer) => {
      process.stdout.write(chunk)
      observer.next({child, chunk})
    })

    child.stderr?.on('data', (chunk: Buffer) => {
      process.stderr.write(chunk)
      observer.next({child, chunk})
    })

    child.on('error', (error) => {
      observer.error(error)
    })

    child.on('close', (_code, _signal) => {
      observer.complete()
    })

    child.on('disconnect', () => {
      observer.complete()
    })

    child.on('exit', (code) => {
      if (typeof code === 'number' && code > 0) {
        observer.error(new Error(`process exited with ${code}`))
      } else {
        observer.complete()
      }
    })

    child.on('message', (_msg, _send) => {
      // console.log('message', {msg})
    })

    child.on('spawn', () => {
      observer.next({child})
    })

    return () => {
      child.kill()
    }
  })
}
