import {parseColor} from '../parse'
import {RGBA} from '../types'

/**
 * @internal
 */
export function rgba(color: unknown, a: number): string {
  const rgb = parseColor(color)

  return `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`
}

const RE_RGBA = /^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+.*\d*)\s*\)$/i

export function parseRgba(color: string): RGBA {
  const match = RE_RGBA.exec(color)

  if (!match) {
    throw new Error(`not a valid RGBA string: "${color}"`)
  }

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: parseInt(match[4], 10),
  }
}
