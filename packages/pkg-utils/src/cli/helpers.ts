import fs from 'fs'
import util from 'util'

export const readFile = util.promisify(fs.readFile)
export const writeFile = util.promisify(fs.writeFile)

export async function readJSONFile(filePath: string): Promise<Record<string, unknown>> {
  const buf = await readFile(filePath)

  return JSON.parse(buf.toString())
}
