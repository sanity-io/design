import chokidar from 'chokidar'
import {Observable} from 'rxjs'

export interface WatchEvent {
  type: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir'
  filename: string
}

export function watch(
  paths: string[],
  options?: {
    ignoreInitial?: boolean
    ignored?: string[]
  }
): Observable<WatchEvent> {
  return new Observable((subscriber) => {
    const watcher = chokidar.watch(paths, {
      ignored: options?.ignored,
      ignoreInitial: options?.ignoreInitial,
    })

    watcher.on('all', (type, filename) => {
      subscriber.next({type, filename})
    })

    return () => {
      watcher.close()
    }
  })
}
