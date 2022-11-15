import colorSpace from 'color-space'
import {LAB, RGB} from './types'

/**
 * @internal
 */
export function labToRgb([l, a, b]: LAB): RGB {
  return colorSpace.lab.rgb([l, a, b])
}
