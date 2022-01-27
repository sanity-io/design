/* eslint-disable no-console */

import fs from 'fs/promises'
import getPort from 'get-port'
import {config} from './config'
import {startWorkshopServer, WorkshopServer} from './workshop'

declare global {
  var __SERVER__: WorkshopServer // eslint-disable-line no-var
}

export default async (): Promise<void> => {
  const port = config.build ? 9009 : await getPort()

  await fs.writeFile(config.statePath, `module.exports = {port: ${port}}\n`)

  async function _close() {
    try {
      await server.close()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  }

  async function handleExit() {
    await _close()
  }

  async function handleKill(code: number | NodeJS.Signals) {
    await _close()
    process.exit(typeof code === 'number' ? code : 0)
  }

  const server = await startWorkshopServer({
    build: config.build,
    debug: config.debug,
    onExit: handleExit,
    port,
  })

  // Exit
  process.on('exit', (code) => {
    handleKill(code)
  })

  // SIGINT
  process.on('SIGINT', (code) => {
    handleKill(code)
  })

  // Catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', (code) => {
    handleKill(code)
  })
  process.on('SIGUSR2', (code) => {
    handleKill(code)
  })

  // Catches uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error(err)
    handleKill(1)
  })

  global.__SERVER__ = server
}
