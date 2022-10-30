import {_responsive} from '../helpers'
import {CSSObject, ThemeProps} from '../types'
import {ResponsiveTextAlignStyleProps} from './types'

/**
 * Get responsive text align styles.
 * @internal
 */
export function responsiveTextAlignStyle(
  props: ResponsiveTextAlignStyleProps & ThemeProps
): CSSObject[] {
  const {theme} = props

  return _responsive(theme.sanity.media, props.$align, (textAlign) => {
    return {textAlign}
  })
}
