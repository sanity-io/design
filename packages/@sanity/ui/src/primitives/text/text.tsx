import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {
  ResponsiveFontStyleProps,
  responsiveTextAlignStyle,
  responsiveTextFont,
} from '../../styles/internal'
import {ThemeFontWeightKey} from '../../theme'
import {TextAlign} from '../../types'
import {textBaseStyle} from './styles'

/**
 * @public
 */
export interface TextProps {
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  size?: number | number[]
  /**
   * Controls how overflowing text is treated.
   * Use `textOverflow="ellipsis"` to render text as a single line which is concatenated with a `…` symbol.
   * @beta
   */
  textOverflow?: 'ellipsis'
  weight?: ThemeFontWeightKey
}

const Root = styled.div<ResponsiveFontStyleProps>(
  responsiveTextFont,
  responsiveTextAlignStyle,
  textBaseStyle
)

const SpanWithTextOverflow = styled.span`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

/**
 * @public
 */
export const Text = forwardRef(function Text(
  props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {align, children: childrenProp, size = 2, textOverflow, weight, ...restProps} = props

  let children = childrenProp

  if (textOverflow === 'ellipsis') {
    children = <SpanWithTextOverflow>{children}</SpanWithTextOverflow>
  }

  return (
    <Root data-ui="Text" {...restProps} $align={align} ref={ref} $size={size} $weight={weight}>
      <span>{children}</span>
    </Root>
  )
})
