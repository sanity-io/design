import * as config from './config'
import {hctToRgb} from './hctToRgb'
import {gray, red, magenta, purple, blue, cyan, green, yellow, orange} from './hues'
import {rgbToHex} from './rgbToHex'
import {ColorPalette, ColorValue} from './types'

export * from './constants'
export * from './darken'
export * from './hctToRgb'
export * from './hexToRgb'
export * from './limit'
export * from './rgbToHex'
export * from './screen'
export * from './types'

export {gray, red, magenta, purple, blue, cyan, green, yellow, orange}

export const hues = {gray, red, magenta, purple, blue, cyan, green, yellow, orange}

/**
 * The black color value.
 * @public
 */
export const black: ColorValue = {
  title: 'Black',
  hct: [config.black.hue, config.black.chroma, config.black.tone || 0],
  hex: rgbToHex(hctToRgb([config.black.hue, config.black.chroma, config.black.tone || 0])),
}

/**
 * The white color value.
 * @public
 */
export const white: ColorValue = {
  title: 'White',
  hct: [config.white.hue, config.white.chroma, config.white.tone || 100],
  hex: rgbToHex(hctToRgb([config.white.hue, config.white.chroma, config.white.tone || 100])),
}

/**
 * The Sanity color palette
 * @public
 */
export const color: ColorPalette = {
  // values
  black,
  white,

  // hues
  gray,
  red,
  magenta,
  purple,
  blue,
  cyan,
  green,
  yellow,
  orange,
}
