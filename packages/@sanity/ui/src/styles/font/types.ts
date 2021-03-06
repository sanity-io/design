import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'

/**
 * @internal
 */
export interface ResponsiveFontSizeStyleProps {
  $size?: number | number[]
}

/**
 * @internal
 */
export interface FontWeightStyleProps {
  $weight?: ThemeFontWeightKey
}

/**
 * @internal
 */
export interface ResponsiveTextAlignStyleProps {
  $align?: TextAlign | TextAlign[]
}

/**
 * @internal
 */
export interface ResponsiveFontStyleProps
  extends FontWeightStyleProps,
    ResponsiveFontSizeStyleProps {
  $accent?: boolean
  $muted?: boolean
}
