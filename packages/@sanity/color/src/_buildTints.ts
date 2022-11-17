import {COLOR_TINTS} from './constants'
import {hslToRgb} from './hslToRgb'
// import {hctToRgb} from './hctToRgb'
import {rgbToHex} from './rgbToHex'
// import {screen} from './screen'
import {ColorConfig, ColorHueConfig, ColorHueKey, ColorTints} from './types'

/** @internal */
export function _buildTints(options: {
  hueKey: ColorHueKey
  black: ColorConfig
  color: ColorHueConfig
}): ColorTints {
  const {
    hueKey,
    // black,
    color,
  } = options
  // const blackRgb = hctToRgb([black.hue, black.chroma, black.tone || 0])
  // const blackRgb = hslToRgb(black.hsl)

  return COLOR_TINTS.reduce<Partial<ColorTints>>((acc, tintKey) => {
    const tint = Number(tintKey)
    const rgb = hslToRgb(color.tints[tintKey].hsl)
    // const tone = 100 - tint / 10
    // const hct: HCT = [color.hue, color.chroma, tone]
    // const rgb = screen(blackRgb, hctToRgb(hct))
    const hex = rgbToHex([Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])])

    acc[tintKey] = {
      title: `${hueKey.slice(0, 1).toUpperCase()}${hueKey.slice(1)} ${tint}`,
      // hct,
      hsl: color.tints[tintKey].hsl,
      hex,
    }

    return acc
  }, {}) as ColorTints
}
