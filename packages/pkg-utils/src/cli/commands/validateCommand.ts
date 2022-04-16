import path from 'path'
import {validate} from '../../validate'

/**
 * Validate a package
 */
export async function validateCommand(opts: {cwd: string}): Promise<void> {
  const cwd = path.resolve(process.cwd(), opts.cwd || '.')

  await validate({cwd})
}
