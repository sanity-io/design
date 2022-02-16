import {BaseTheme, ThemeColor, ThemeColorName, ThemeColorSchemeKey} from './lib/theme'

/**
 * @public
 */
export type {BaseTheme}

/**
 * @public
 */
export interface Theme {
  sanity: Omit<BaseTheme, 'color'> & {
    color: ThemeColor
  }
}

/**
 * @public
 */
export interface ThemeContextValue {
  version: 0.0
  scheme: ThemeColorSchemeKey
  theme: BaseTheme
  tone: ThemeColorName
}
