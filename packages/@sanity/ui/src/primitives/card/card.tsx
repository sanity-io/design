import React, {forwardRef} from 'react'
import {isValidElementType} from 'react-is'
// import {ResponsiveRadiusProps} from '..'
// import styled from 'styled-components'
// import {
//   responsiveBorderStyle,
//   ResponsiveBorderStyleProps,
//   responsiveRadiusStyle,
//   ResponsiveRadiusStyleProps,
//   responsiveShadowStyle,
//   ResponsiveShadowStyleProps,
// } from '../../styles/internal'
import {
  // ThemeColorSchemeKey,
  useTheme,
} from '../../theme'
// import {CardTone} from '../../types'
import {Box, BoxProps} from '../box'
// import {ResponsiveBorderProps, ResponsiveRadiusProps, ResponsiveShadowProps} from '../types'
// import {cardStyle} from './styles'
// import {CardStyleProps} from './types'

/**
 * @public
 */
// export type CardProps = BoxProps
export interface CardProps extends BoxProps {
  /**
   * Do not use in production.
   * @deprecated Use `checkered` instead.
   */
  __unstable_checkered?: boolean
  /**
   * Do not use in production.
   * @deprecated Use `withFocusRing` instead.
   */
  __unstable_focusRing?: boolean
  // pressed?: boolean
  // scheme?: ThemeColorSchemeKey
  // tone?: CardTone
}

// const Root = styled(Box)<
//   CardStyleProps &
//     ResponsiveRadiusStyleProps &
//     ResponsiveBorderStyleProps &
//     ResponsiveShadowStyleProps
// >(responsiveBorderStyle, responsiveRadiusStyle, responsiveShadowStyle, cardStyle)

/**
 * @public
 */
export const Card = forwardRef(function Card(
  props: CardProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    // pressed = false,
    __unstable_checkered: checkered = false,
    __unstable_focusRing: focusRing = false,
    as: asProp,
    // border,
    // borderTop,
    // borderRight,
    // borderBottom,
    // borderLeft,
    // radius = 0,
    // scheme,
    selected,
    // shadow,
    tone: toneProp = 'default',
    ...restProps
  } = props
  const as = isValidElementType(asProp) ? asProp : 'div'
  const theme = useTheme()
  // const rootTheme = useRootTheme()
  const tone = toneProp === 'inherit' ? theme.color.config.tone : toneProp

  return (
    // <ThemeColorProvider scheme={scheme} tone={tone}>
    <Box
      data-ui="Card"
      {...restProps}
      as={as}
      // border={border}
      // borderTop={borderTop}
      // borderRight={borderRight}
      // borderBottom={borderBottom}
      // borderLeft={borderLeft}
      checkered={checkered}
      withFocusRing={focusRing}
      // $radius={radius}
      // $shadow={shadow}
      tone={tone}
      // forwardedAs={as}
      ref={ref}
      // scheme={scheme}
      selected={selected}
      // shadow={shadow}
    />
  )
})
