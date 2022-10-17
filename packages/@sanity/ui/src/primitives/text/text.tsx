import {forwardRef} from 'react'
import styled from 'styled-components'
import {useArrayProp} from '../../hooks'
import {
  ResponsiveFontStyleProps,
  responsiveTextAlignStyle,
  responsiveTextFont,
} from '../../styles/internal'
import {ThemeFontWeightKey, useTheme} from '../../theme'
import {TextAlign} from '../../types'
import {useSize} from '../../utils'
import {textBaseStyle} from './styles'

/**
 * @public
 */
export interface TextProps {
  accent?: boolean
  align?: TextAlign | TextAlign[]
  as?: React.ElementType | keyof JSX.IntrinsicElements
  muted?: boolean
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

function useTextSize(size?: number | number[]) {
  const {fonts} = useTheme().sanity

  return useSize({
    max: fonts.text.sizes.length,
    size,
  })
}

/**
 * @public
 */
export const Text = forwardRef(function Text(
  props: TextProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    accent = false,
    align,
    children: childrenProp,
    muted = false,
    size = 2,
    textOverflow,
    weight,
    ...restProps
  } = props

  const $size = useTextSize(size)

  let children = childrenProp

  if (textOverflow === 'ellipsis') {
    children = <SpanWithTextOverflow>{children}</SpanWithTextOverflow>
  }

  return (
    <Root
      data-ui="Text"
      {...restProps}
      $accent={accent}
      $align={useArrayProp(align)}
      $muted={muted}
      ref={ref}
      $size={$size}
      $weight={weight}
    >
      <span>{children}</span>
    </Root>
  )
})
