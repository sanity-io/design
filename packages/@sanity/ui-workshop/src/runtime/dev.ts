/* eslint-disable no-console */

import {createServer} from './server'

export function dev(options: {cwd: string; host?: string; port?: number; root?: string}): void {
  const {cwd, host, port, root} = options

  const server = createServer({
    cwd,
    host,
    port,
    root,
  })

  server.listen().subscribe({
    error: (err) => {
      console.error(err)
      process.exit(1)
    },
  })
}
