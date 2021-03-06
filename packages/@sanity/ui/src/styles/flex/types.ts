import {FlexAlign, FlexDirection, FlexJustify, FlexWrap} from '../../types'

/**
 * @internal
 */
export interface ResponsiveFlexStyleProps {
  $align?: FlexAlign | FlexAlign[]
  $direction?: FlexDirection | FlexDirection[]
  $gap?: number | number[]
  $justify?: FlexJustify | FlexJustify[]
  $wrap?: FlexWrap | FlexWrap[]
}

/**
 * @internal
 */
export interface ResponsiveFlexItemStyleProps {
  $flex?: number | number[]
}

/**
 * @internal
 */
export interface FlexItemStyleProps extends ResponsiveFlexItemStyleProps {}
