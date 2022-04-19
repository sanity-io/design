import path from 'path'

export const config = {
  build: Boolean(process.env.CI),
  debug: true,
  statePath: path.resolve(__dirname, 'state.js'),
}
