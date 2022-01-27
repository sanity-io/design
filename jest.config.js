/* eslint-disable @typescript-eslint/no-var-requires */

const {workspaces} = require('./package.json')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  maxWorkers: 1,
  projects: workspaces.map((pattern) => `<rootDir>/${pattern}`),
  testTimeout: 10000,
}
