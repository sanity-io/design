/**
 * Generates src/colorPalette.ts based on `COLOR_HUES` constant + values in `src/config.js`
 * This lets us move `polished` (or similar) to a dev dependency, reducing bundle size
 */

import {writeFileSync, readFileSync} from 'fs'
import path from 'path'
import {format} from 'prettier'
import {ColorHueKey, ColorValue, ColorTintKey, HCT} from '../src'
import {COLOR_HUES, COLOR_TINTS} from '../src'
import {hctToRgb} from '../src'
import {rgbToHex} from '../src'
import {screen} from '../src'
import * as config from '../src/config'

const ROOT_PATH = path.resolve(__dirname, '../../../..')

const GENERATED_BANNER = `/* THIS FILE IS AUTO-GENERATED – DO NOT EDIT */`

// Given a hue (eg red, blue) - grab the colors from configured values
// and generate a named export containing a generated set of tints
// Note: A more compact format + expander function was considered,
// but only amounted to ~72 byte decrease in bundle size after gziping
function buildExport(hue: ColorHueKey) {
  const colorConfig = config[hue]
  const blackRgb = hctToRgb([config.black.hue, config.black.chroma, config.black.tone || 0])

  if (!colorConfig) {
    throw new Error(`src/config is missing export for ${hue}`)
  }

  const initial = {} as Partial<{[key in ColorTintKey]: ColorValue}>
  const tints = COLOR_TINTS.reduce((acc, tint) => {
    const tone = 100 - Number(tint) / 10
    const hct: HCT = [colorConfig.hue, colorConfig.chroma, tone]
    const rgb = screen(blackRgb, hctToRgb(hct))
    const hex = rgbToHex([Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])])

    acc[tint] = {
      title: `${hue.slice(0, 1).toUpperCase()}${hue.slice(1)} ${tint}`,
      // lab,
      hct,
      hex,
    }

    return acc
  }, initial)

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
