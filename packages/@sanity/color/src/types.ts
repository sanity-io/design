/**
 * H (hue)     0 <= hue < 360
 * C (chroma)  0 <= chroma < ?
 * T (tone)    0 <= tone <= 100
 */
export type HCT = [number, number, number]

export type LAB = [number, number, number]

export type RGB = [number, number, number]

/**
 * @public
 */
export interface ColorHueConfig {
  // darkest: ColorValue
  // mid: string
  // lightest: ColorValue
  // midPoint: number
  title: string
  // lab: [number, number, number]

  /** H (hue)     0 <= hue < 360 */
  hue: number

  /** C (chroma)  0 <= chroma < ? **/
  chroma: number

  tone?: number
}

/**
 * @public
 */
export interface ColorValue {
  hct: HCT
  hex: string
  // lab: LAB
  title: string
}

/**
 * @public
 */
export type ColorTintKey =
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950'

/**
 * @public
 */
export type ColorTints = {
  [key in ColorTintKey]: ColorValue
}

/**
 * @public
 */
export type ColorHueKey =
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'magenta'

/**
 * @public
 */
export interface ColorPalette {
  // Color values
  black: ColorValue
  white: ColorValue

  // Color tints
  gray: ColorTints
  red: ColorTints
  orange: ColorTints
  yellow: ColorTints
  green: ColorTints
  cyan: ColorTints
  blue: ColorTints
  purple: ColorTints
  magenta: ColorTints
}
