/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const path = require('path')
const {createJestConfig} = require('../../../test/jestConfig')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = createJestConfig({
  displayName: require('./package.json').name,
  modulePathIgnorePatterns: [
    path.resolve(__dirname, 'lib/'),
    path.resolve(__dirname, 'test/__fixtures__/'),
  ],
  testEnvironment: 'node',
})
