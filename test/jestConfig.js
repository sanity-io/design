/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */

'use strict'

const path = require('path')
const {defaults} = require('jest-config')

const ROOT_PATH = path.resolve(__dirname, '..')

/**
 * @param {import('@jest/types').Config.InitialOptions} config
 * @returns {import('@jest/types').Config.InitialOptions}
 */
exports.createJestConfig = function createJestConfig(config = {}) {
  const {
    globalSetup,
    globalTeardown,
    moduleNameMapper,
    setupFilesAfterEnv,
    testEnvironment,
    testRegex,
    transform,
    ...restConfig
  } = config

  /** @type {import('@jest/types').Config.InitialOptions} */
  const result = {
    ...restConfig,
    globalSetup: globalSetup || path.resolve(__dirname, 'global/setup.ts'),
    globalTeardown: globalTeardown || path.resolve(__dirname, 'global/teardown.ts'),
    moduleNameMapper: {
      ...defaults.moduleNameMapper,
      ...moduleNameMapper,
      '^@sanity/(.*)$': path.resolve(ROOT_PATH, 'packages/@sanity/$1/src'),
      '^\\$test$': path.resolve(ROOT_PATH, 'test'),
    },
    setupFilesAfterEnv: [
      ...defaults.setupFilesAfterEnv,
      path.resolve(__dirname, 'setup/afterEnv.ts'),
      ...(setupFilesAfterEnv || []),
    ],
    testEnvironment: testEnvironment || 'jsdom',
    // - match all files in `__tests__` directories
    // - match files ending with `.test.js`, `.test.ts`, `.test.jsx`, or `.test.tsx`
    testRegex: testRegex || '(/__tests__/.*|\\.test)\\.[jt]sx?$',
    // testTimeout: 30000,
    transform: transform || {'\\.[jt]sx?$': ['esbuild-jest', {sourcemap: true}]},
  }

  return result
}
