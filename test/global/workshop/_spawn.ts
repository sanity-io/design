/* eslint-disable no-console */

import {ChildProcess, spawn, SpawnOptions} from 'child_process'
import {Observable} from 'rxjs'

export function _spawn(
  command: string,
  args: string[],
  options: SpawnOptions
): Observable<{child: ChildProcess; chunk?: Buffer}> {
  return new Observable((observer) => {
    const child = spawn(command, args, options)

    console.log(`$ ${command}`)

    child.stdout?.on('data', (chunk: Buffer) => {
      process.stdout.write(chunk)
      observer.next({child, chunk})
    })

    child.stderr?.on('data', (chunk: Buffer) => {
      process.stderr.write(chunk)
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
      observer.next({child})
    })

    return () => {
      child.kill()
    }
  })
}
