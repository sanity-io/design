import * as config from './config'
// import {hctToRgb} from './hctToRgb'
import {hslToRgb} from './hslToRgb'
import {gray, red, magenta, purple, blue, cyan, green, yellow, orange} from './hues'
import {rgbToHex} from './rgbToHex'
import {ColorPalette, ColorValue} from './types'

export * from './_buildTints'
export * from './constants'
export * from './darken'
export * from './hctToRgb'
export * from './hexToRgb'
export * from './hslToRgb'
export * from './limit'
export * from './rgbToHex'
export * from './screen'
export * from './types'

export {gray, red, magenta, purple, blue, cyan, green, yellow, orange}

export {config}

/** @internal */
export const hues = {gray, magenta, purple, blue, cyan, green, yellow, orange, red}

/**
 * The black color value.
 * @public
 */
export const black: ColorValue = {
  title: 'Black',
  // hct: [config.black.hue, config.black.chroma, config.black.tone || 0],
  // hex: rgbToHex(hctToRgb([config.black.hue, config.black.chroma, config.black.tone || 0])),
  hsl: config.black.hsl,
  hex: rgbToHex(hslToRgb(config.black.hsl)),
}

/**
 * The white color value.
 * @public
 */
export const white: ColorValue = {
  title: 'White',
  // hct: [config.white.hue, config.white.chroma, config.white.tone || 100],
  // hex: rgbToHex(hctToRgb([config.white.hue, config.white.chroma, config.white.tone || 100])),
  hsl: config.white.hsl,
  hex: rgbToHex(hslToRgb(config.white.hsl)),
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
