import {writeFile} from 'fs/promises'
import path from 'path'
import {SanityDocument} from '@sanity/client'
import chalk from 'chalk'
import mkdirp from 'mkdirp'
import {_encodePackageName} from '../../_helpers'
import {config} from '../../config'

export async function loadToFs(options: {
  cwd: string
  scope?: string
  name: string
  docs: SanityDocument[]
  version: string
}): Promise<void> {
  const {cwd, scope, name, docs, version} = options
  const fullName = _encodePackageName(scope, name)

  const packagePath = path.resolve(config.fs.etcPath, fullName)

  await mkdirp(packagePath)

  const filePath = path.resolve(packagePath, `${version}.json`)

  await writeFile(filePath, JSON.stringify(docs, null, 2) + '\n')

  // prettier-ignore
  console.log(
    `${chalk.green('success')} [${fullName}] Loaded ${docs.length} documents to ${path.relative(cwd, filePath)}`
  )
}
