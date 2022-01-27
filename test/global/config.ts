import path from 'path'

export const config = {
  build: Boolean(process.env.CI),
  debug: process.env.DEBUG === '1',
  statePath: path.resolve(__dirname, 'state.js'),
}
