/* eslint-disable no-console */

import cac, {CAC} from 'cac'
import chalk from 'chalk'
import {isString} from '../helpers'
import {ChunkTarget} from '../types'
import {bundleCommand} from './commands/bundleCommand'
import {transpileCommand} from './commands/transpileCommand'
import {validateCommand} from './commands/validateCommand'

function _bundleCommand(cli: CAC) {
  cli
    .command('bundle', 'bundle package')
    .option('--target <target>', "[string] bundle target (default: 'web')", {
      default: 'web',
    })
    .option('--tsconfig <file>', '[string] path to TypeScript configuration file')
    .option('--validate [validator]', '[boolean] validate the package (default: false)', {
      default: false,
    })
    .option('--watch [watcher]', '[boolean] watch the package (default: false)', {
      default: false,
    })
    .action(async (options) => {
      const cwd = isString(options.cwd) ? options.cwd : process.cwd()

      try {
        await bundleCommand({
          cwd,
          target: (isString(options.target) ? options.target : 'web') as ChunkTarget,
          tsconfig: isString(options.tsconfig) ? options.tsconfig : undefined,
          validate: Boolean(options.validate),
          watch: Boolean(options.watch),
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(`${chalk.red('error')} ${error.message}`)
        }

        process.exit(1)
      }
    })
}

function _transpileCommand(cli: CAC) {
  cli
    .command('transpile', 'transpile package')
    .option('--target <target>', "[string] transpile target (default: 'web')", {
      default: 'web',
    })
    .option('--tsconfig <file>', '[string] path to TypeScript configuration file')
    // .option('--validate [validator]', '[boolean] validate the package (default: false)', {
    //   default: false,
    // })
    .option('--watch [watcher]', '[boolean] watch the package (default: false)', {
      default: false,
    })
    .action(async (options) => {
      const cwd = isString(options.cwd) ? options.cwd : process.cwd()

      try {
        await transpileCommand({
          cwd,
          target: (isString(options.target) ? options.target : 'web') as ChunkTarget,
          tsconfig: isString(options.tsconfig) ? options.tsconfig : undefined,
          // validate: Boolean(options.validate),
          watch: Boolean(options.watch),
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(`${chalk.red('error')} ${error.message}`)
        }

        process.exit(1)
      }
    })
}

function _validateCommand(cli: CAC) {
  cli.command('validate', 'validate package').action(async (options) => {
    const cwd = isString(options.cwd) ? options.cwd : process.cwd()

    try {
      await validateCommand({cwd})
    } catch (error) {
      if (error instanceof Error) {
        console.error(`${chalk.red('error')} ${error.message}`)
      }

      process.exit(1)
    }
  })
}

async function main() {
  const cli = cac()

  cli.option('--cwd <dir>', '[string] working directory to use', {default: process.cwd()})

  _bundleCommand(cli)
  _transpileCommand(cli)
  _validateCommand(cli)

  cli.help()

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  cli.version(require('../../package.json').version)

  const result = cli.parse()

  if (result.args.length) {
    console.error(chalk.red(`unknown command: ${result.args.join(' ')}`))
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(`${chalk.red('error')} ${err.message}`)
  process.exit(1)
})
