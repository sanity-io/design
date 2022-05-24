import path from 'path'

export function _compileScopes(options: {runtimePath: string; scopePaths: string[]}): string {
  const {runtimePath, scopePaths} = options

  let code = ''

  for (let i = 0; i < scopePaths.length; i += 1) {
    const p = scopePaths[i]
    const scopePath = path
      .relative(runtimePath, p)
      .replace(/\.[^/.]+$/, '')
      .replace(/\/index$/, '')

    code += `import s${i} from '${scopePath.startsWith('.') ? scopePath : `./${scopePath}`}'\n`
  }

  code += '\n'
  code += `export const scopes = [\n`

  for (let i = 0; i < scopePaths.length; i += 1) {
    code += `  s${i},\n`
  }

  code += ']\n'

  return code
}
