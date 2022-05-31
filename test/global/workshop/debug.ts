/* eslint-disable no-console */

import {config} from '../config'
import {startWorkshopServer} from './server'

startWorkshopServer({debug: config.debug, port: 9009}).catch((err) => {
  console.error(err)
  process.exit(1)
})
