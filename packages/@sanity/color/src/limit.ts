import {RGB} from './types'

function _interpolate(min: number, max: number, val: number) {
  const size = max - min

  return min + size * val
}

/** @internal */
export function limit(darkest: RGB, lightest: RGB, source: RGB): RGB {
  const r = Math.round(_interpolate(darkest[0], lightest[0], source[0] / 255))
  const g = Math.round(_interpolate(darkest[1], lightest[1], source[1] / 255))
  const b = Math.round(_interpolate(darkest[2], lightest[2], source[2] / 255))

  return [r, g, b]
}
