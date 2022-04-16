/* eslint-disable no-console */

import fs from 'fs'
import {access, stat} from 'fs/promises'
import path from 'path'
import chalk from 'chalk'
import semver from 'semver'
import {_resolveExports} from '../bundle/helpers'
import {TERM_DIVIDER} from './constants'

export async function validate(opts: {cwd: string}): Promise<void> {
  const {cwd} = opts

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkg = require(path.resolve(cwd, 'package.json'))

  console.log(TERM_DIVIDER)

  if (!pkg.name) {
    throw new Error('missing "name" field')
  }

  const nameSegments = pkg.name.split('/')
  const scope = nameSegments.length === 2 ? nameSegments[0] : null
  const name = nameSegments.length === 2 ? nameSegments[1] : nameSegments[0]

  if (scope) {
    console.log(`${chalk.blue('scope')}         ${chalk.green(scope)}`)
  }

  console.log(`${chalk.blue('name')}          ${chalk.green(name)}`)
  console.log(`${chalk.blue('side effects')}  ${chalk.blue((pkg.sideEffects ?? true).toString())}`)

  const version = await validateVersion({pkg})

  console.log(
    [
      `${chalk.blue('version')}       `,
      chalk.blue(version.major),
      chalk.magenta('.'),
      chalk.blue(version.minor),
      chalk.magenta('.'),
      chalk.blue(version.patch),
      version.prerelease.length
        ? chalk.magenta('-') +
          version.prerelease
            .map((segment) => {
              if (typeof segment === 'string') {
                return chalk.green(segment)
              }

              return chalk.blue(segment)
            })
            .join(chalk.magenta('.'))
        : '',
    ].join('')
  )

  await validateLicense({pkg})
  await validateAuthor({pkg})
  await validateExports({cwd, pkg})
  await validateBin({cwd, pkg})

  // @todo: validate "files"
  // @todo: validate "types"

  console.log(TERM_DIVIDER)
}

async function validateVersion(opts: {pkg: Record<string, any>}) {
  const {pkg} = opts

  if (!pkg.version) {
    throw new Error('missing "version" field')
  }

  const version = semver.parse(pkg.version)

  if (version === null) {
    throw new Error('Invalid "version" field')
  }

  return version
}

async function validateLicense(opts: {pkg: Record<string, any>}) {
  const {pkg} = opts

  if (pkg.license === undefined) {
    throw new Error('missing "license" field')
  }
}

async function validateAuthor(opts: {pkg: Record<string, any>}) {
  const {pkg} = opts

  if (!pkg.author) {
    throw new Error('missing "author" field')
  }

  console.log(`${chalk.blue('author')}        ${chalk.green(pkg.author)}`)
}

async function validateExports(opts: {cwd: string; pkg: Record<string, any>}) {
  const {cwd, pkg} = opts

  const exports = _resolveExports(pkg)

  for (const _export of exports) {
    console.log(
      `\n${chalk.magenta('export')}        ${chalk.yellow(`${path.join(pkg.name, _export.path)}`)}`
    )

    console.log(
      `${chalk.magenta('source')}        ${chalk.green(path.relative(cwd, _export.source))}`
    )

    if (_export.output.commonjs) {
      const filePath = path.resolve(cwd, _export.output.commonjs)
      const exists = await _fileExists(filePath)

      if (!exists) {
        throw new Error(`the commonjs chunk does not exist: ${path.relative(cwd, filePath)}`)
      }

      console.log(`${chalk.magenta('commonjs')}      ${chalk.green(path.relative(cwd, filePath))}`)
    }

    if (_export.output.module) {
      const filePath = path.resolve(cwd, _export.output.module)
      const exists = await _fileExists(filePath)

      if (!exists) {
        throw new Error(`the esm (module) chunk does not exist: ${path.relative(cwd, filePath)}`)
      }

      console.log(`${chalk.magenta('esm')}           ${chalk.green(path.relative(cwd, filePath))}`)
    }

    if (_export.output.modern) {
      const filePath = path.resolve(cwd, _export.output.modern)
      const exists = await _fileExists(filePath)

      if (!exists) {
        throw new Error(`the esm (modern) chunk does not exist: ${path.relative(cwd, filePath)}`)
      }

      console.log(`${chalk.magenta('esm (modern)')}  ${chalk.green(path.relative(cwd, filePath))}`)
    }
  }
}

async function validateBin(opts: {cwd: string; pkg: Record<string, any>}) {
  const {cwd, pkg} = opts

  if (pkg.bin) {
    for (const [binName, binPath] of Object.entries(pkg.bin) as any) {
      const executable = await _fileExecutable(path.resolve(cwd, binPath))

      if (!executable) {
        throw new Error(`not executable: "${binName}" (${binPath})`)
      }

      console.log(`\n${chalk.magenta('$')} ${binName}`)
      console.log(`executable    ${path.relative(cwd, binPath)}`)
    }
  }
}

async function _fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, fs.constants.F_OK)

    return true
  } catch (_) {
    return false
  }
}

async function _fileExecutable(filePath: string): Promise<boolean> {
  const {mode} = await stat(filePath)

  // convert mode to standard unix octal format
  const unixPerm = '0' + (mode & parseInt('777', 8)).toString(8)

  return unixPerm === '0755'
}
