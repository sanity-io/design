import {access, constants} from 'fs'
import {readFile} from 'fs/promises'
import path from 'path'
import pkgUp from 'pkg-up'
import {Observable} from 'rxjs'

export function getExists(filename: string): Promise<boolean> {
  return new Promise((resolve) => {
    access(filename, constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

export function getExists$(filename: string): Observable<boolean> {
  return new Observable((subscriber) => {
    access(filename, constants.F_OK, (err) => {
      if (err) {
        subscriber.next(false)
      } else {
        subscriber.next(true)
      }

      subscriber.complete()
    })
  })
}

async function readJSONFile(filePath: string) {
  const buf = await readFile(filePath)

  return JSON.parse(buf.toString())
}

export async function _isMonorepo(basePath: string): Promise<boolean> {
  const packageJsonPath = await pkgUp({cwd: basePath})

  if (!packageJsonPath) {
    return false
  }

  const packagePath = path.dirname(packageJsonPath)

  try {
    const pkg = await readJSONFile(packageJsonPath)

    if (pkg.name === 'sanity-design') {
      return true
    }
  } catch (err) {
    return false
  }

  return _isMonorepo(path.dirname(packagePath))
}
