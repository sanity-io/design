import {merge, Observable} from 'rxjs'
import {distinctUntilChanged, map} from 'rxjs/operators'
import {getExists$} from './_helpers'
import {watch, WatchEvent} from './watch'

export function file(options: {filename: string}): Observable<string | undefined> {
  const {filename} = options

  const exists$ = getExists$(options.filename)

  const changeEvent$ = watch([filename], {
    ignoreInitial: false,
  })

  const initialEvent$: Observable<WatchEvent> = exists$.pipe(
    map((_exists) => {
      return _exists ? {type: 'add', filename} : {type: 'unlink', filename}
    })
  )

  const event$ = merge(initialEvent$, changeEvent$)

  return event$.pipe(
    map((event) => {
      if (event.type === 'add') {
        return event.filename
      }

      if (event.type === 'change') {
        return event.filename
      }

      return undefined
    }),
    distinctUntilChanged()
  )
}
