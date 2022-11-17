/**
 * Generates src/colorPalette.ts based on `COLOR_HUES` constant + values in `src/config.js`
 * This lets us move `polished` (or similar) to a dev dependency, reducing bundle size
 */

import {writeFileSync, readFileSync} from 'fs'
import path from 'path'
import {format} from 'prettier'
import {ColorHueKey, _buildTints} from '../src'
import {COLOR_HUES} from '../src'
import * as config from '../src/config'

const ROOT_PATH = path.resolve(__dirname, '../../../..')

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

// Given a hue (eg red, blue) - grab the colors from configured values
// and generate a named export containing a generated set of tints
// Note: A more compact format + expander function was considered,
// but only amounted to ~72 byte decrease in bundle size after gziping
function buildExport(hue: ColorHueKey) {
  const colorConfig = config[hue]

  if (!colorConfig) {
    throw new Error(`src/config is missing export for ${hue}`)
  }

  const tints = _buildTints({color: colorConfig, hueKey: hue, black: config.black})

  return `/**\n * @public\n */\nexport const ${hue}: ColorTints = ${JSON.stringify(tints, null, 2)}`
}

// Actual "template" to output
const tpl = `${GENERATED_BANNER}

import {ColorTints} from './types'

${COLOR_HUES.map(buildExport).join('\n\n')}

/**
 * @public
 */
export const hues = {${COLOR_HUES.join(', ')}};
`

// Format generated file with prettier so it can be commited without us being ashamed
const prettierConfig = JSON.parse(readFileSync(path.resolve(ROOT_PATH, '.prettierrc'), 'utf8'))
const filepath = path.resolve(__dirname, '../src/hues.ts')

writeFileSync(filepath, format(tpl, {filepath, ...prettierConfig}))
