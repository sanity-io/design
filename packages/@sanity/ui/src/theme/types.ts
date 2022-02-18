import {ThemeV0, ThemeColorName, ThemeColorSchemeKey} from './v0'
import {ThemeV1} from './v1/theme'

/**
 * @public
 */
export interface ThemeContextValue_V0 {
  version: 0.0
  scheme: ThemeColorSchemeKey
  theme: ThemeV0
  tone: ThemeColorName
}

/**
 * @public
 */
export interface ThemeContextValue_V1 {
  version: 1.0
  theme: ThemeV1
}

export type ThemeContextValue = ThemeContextValue_V0 | ThemeContextValue_V1
