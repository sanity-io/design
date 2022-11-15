import {_clamp} from './_helpers'
import {RGB} from './types'

function screenChannel(backdrop: number, source: number) {
  return backdrop + source - backdrop * source
}

/**
 * Apply the \`screen\` blend mode
 * Source: https://www.w3.org/TR/compositing-1/#blendingscreen
 *
 * @internal
 */
export function screen(b: RGB, s: RGB): RGB {
  return [
    Math.round(_clamp(screenChannel(b[0] / 255, s[0] / 255) * 255)),
    Math.round(_clamp(screenChannel(b[1] / 255, s[1] / 255) * 255)),
    Math.round(_clamp(screenChannel(b[2] / 255, s[2] / 255) * 255)),
  ]
}
