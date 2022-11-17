/**
 * ```
 * H (hue)     0 <= hue < 360
 * C (chroma)  0 <= chroma < ?
 * T (tone)    0 <= tone <= 100
 * ```
 *
 * @public
 */
export type HCT = [number, number, number]

/** @internal */
export type LAB = [number, number, number]

/** @internal */
export type RGB = [number, number, number]

/** @public */
export type HSL = [number, number, number]

/**
 * @public
 */
export interface ColorConfig {
  title: string

  /**
   * ```
   * H (hue)     0 <= hue < 360
   * ```
   */
  // hue: number

  /**
   * ```
   * C (chroma)  0 <= chroma < ?
   * ```
   */
  // chroma: number

  // tints: {tint: }[]

  // tone: number

  hsl: HSL
}

/**
 * @public
 */
export interface ColorHueConfig {
  title: string

  /**
   * ```
   * H (hue)     0 <= hue < 360
   * ```
   */
  // hue: number

  /**
   * ```
   * C (chroma)  0 <= chroma < ?
   * ```
   */
  // chroma: number

  // tints: {tint: }[]

  // tone?: number

  // tune?: Partial<{
  //   [key in ColorTintKey]: {
  //     /**
  //      * ```
  //      * H (hue)     0 <= hue < 360
  //      * ```
  //      */
  //     hue?: number

  //     /**
  //      * ```
  //      * C (chroma)  0 <= chroma < ?
  //      * ```
  //      */
  //     chroma?: number

  //     /**
  //      * ```
  //      * T (tone)    0 <= tone <= 100
  //      * ```
  //      */
  //     // tone?: number
  //   }
  // }>

  tints: {
    [key in ColorTintKey]: ColorConfig
  }
}

/**
 * @public
 */
export interface ColorValue {
  // hct: HCT
  hex: string
  hsl: HSL
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
