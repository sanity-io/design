import {Hct, hexFromArgb} from '@material/material-color-utilities'
import {hexToRgb} from './hexToRgb'
import {HCT, RGB} from './types'

export function hctToRgb(hct: HCT): RGB {
  const color = Hct.from(hct[0], hct[1], hct[2])

  const hex = hexFromArgb(color.toInt())

  return hexToRgb(hex)
}
