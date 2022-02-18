import React, {forwardRef, useMemo} from 'react'
import styled from 'styled-components'

import {
  BoxStyleProps,
  FlexItemStyleProps,
  ResponsiveBoxStyleProps,
  ResponsiveGridItemStyleProps,
  ResponsiveMarginStyleProps,
  ResponsivePaddingStyleProps,
  boxBgStyle,
  boxFgStyle,
  boxStyle,
  flexItemStyle,
  responsiveBoxStyle,
  responsiveGridItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle,
  responsiveBorderStyle,
  ResponsiveBorderStyleProps,
  responsiveShadowStyle,
  ResponsiveShadowStyleProps,
  responsiveRadiusStyle,
} from '../../styles/internal'
import {ThemeProvider, useTheme} from '../../theme'
import {
  ResponsiveBoxProps,
  ResponsiveBorderProps,
  ResponsiveFlexItemProps,
  ResponsiveGridItemProps,
  ResponsiveMarginProps,
  ResponsivePaddingProps,
  ResponsiveRadiusProps,
  ResponsiveShadowProps,
} from '../types'

/**
 * @public
 */
export interface BoxProps
  extends ResponsiveFlexItemProps,
    ResponsiveBoxProps,
    ResponsiveBorderProps,
    ResponsiveGridItemProps,
    ResponsiveMarginProps,
    ResponsivePaddingProps,
    ResponsiveRadiusProps,
    ResponsiveShadowProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  border?: boolean
  bg?: string
  checkered?: boolean
  fg?: string
  mode?: string
  palette?: string
  pressed?: boolean
  scheme?: string
  tone?: string
  withFocusRing?: boolean
}

const Root = styled.div<
  BoxStyleProps &
    FlexItemStyleProps &
    ResponsiveBorderStyleProps &
    ResponsiveBoxStyleProps &
    ResponsiveGridItemStyleProps &
    ResponsiveMarginStyleProps &
    ResponsivePaddingStyleProps &
    ResponsiveShadowStyleProps
>(
  boxStyle,
  boxBgStyle,
  boxFgStyle,
  flexItemStyle,
  responsiveBorderStyle,
  responsiveBoxStyle,
  responsiveGridItemStyle,
  responsiveMarginStyle,
  responsivePaddingStyle,
  responsiveRadiusStyle,
  responsiveShadowStyle
)

/**
 * @public
 */
export const Box = forwardRef(function Box(
  props: BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const theme = useTheme()

  const {
    as: asProp = 'div',
    bg,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    checkered,
    column,
    columnStart,
    columnEnd,
    display = 'block',
    flex,
    fg,
    height,
    margin = props.m ?? 0,
    marginX = props.mx,
    marginY = props.my,
    marginTop = props.mt,
    marginRight = props.mr,
    marginBottom = props.mb,
    marginLeft = props.ml,
    // omit margin shorthands
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    // end omit margin shorthands
    mode = theme.color.config.mode,
    overflow,
    padding = props.p ?? 0,
    paddingX = props.px,
    paddingY = props.py,
    paddingTop = props.pt,
    paddingRight = props.pr,
    paddingBottom = props.pb,
    paddingLeft = props.pl,
    // omit padding shorthands
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    // end omit padding shorthands
    palette = theme.color.config.palette,
    pressed,
    radius = 0,
    row,
    rowStart,
    rowEnd,
    scheme = theme.color.config.scheme,
    selected,
    shadow = 0,
    sizing,
    tone: toneProp,
    withFocusRing: focusRing,
    ...restProps
  } = props

  const tone = useMemo(() => {
    const t = toneProp

    if (mode && mode !== theme.color.config.mode) {
      return t
    }

    if (palette && palette !== theme.color.config.palette) {
      return t
    }

    // if (t && t === theme.color.config.tone) {
    //   t = undefined
    // }

    // if (mode && mode !== theme.color.config.mode) {
    //   t = t || theme.color.config.tone
    // }

    // if (palette && palette !== theme.color.config.palette) {
    //   t = t || theme.color.config.tone
    // }

    return t
  }, [mode, palette, theme, toneProp])

  return (
    <ThemeProvider mode={mode} palette={palette} scheme={scheme} tone={tone}>
      <Root
        data-as={typeof asProp === 'string' ? asProp : undefined}
        data-checkered={checkered ? '' : undefined}
        data-mode={mode}
        data-palette={palette}
        data-pressed={pressed ? '' : undefined}
        data-scheme={theme.color.config.scheme}
        data-selected={selected ? '' : undefined}
        data-tone={tone}
        data-ui="Box"
        {...restProps}
        $bg={bg || tone}
        $border={border}
        $borderTop={borderTop}
        $borderRight={borderRight}
        $borderBottom={borderBottom}
        $borderLeft={borderLeft}
        $checkered={checkered}
        $column={column}
        $columnStart={columnStart}
        $columnEnd={columnEnd}
        $display={display}
        $fg={fg || tone}
        $focusRing={focusRing}
        $flex={flex}
        $height={height}
        $margin={margin}
        $marginX={marginX}
        $marginY={marginY}
        $marginTop={marginTop}
        $marginRight={marginRight}
        $marginBottom={marginBottom}
        $marginLeft={marginLeft}
        $overflow={overflow}
        $padding={padding}
        $paddingX={paddingX}
        $paddingY={paddingY}
        $paddingTop={paddingTop}
        $paddingRight={paddingRight}
        $paddingBottom={paddingBottom}
        $paddingLeft={paddingLeft}
        $radius={radius}
        $row={row}
        $rowStart={rowStart}
        $rowEnd={rowEnd}
        $shadow={shadow}
        $sizing={sizing}
        as={asProp}
        data-bg={bg || tone}
        data-fg={fg || tone}
        ref={ref}
      >
        {props.children}
      </Root>
    </ThemeProvider>
  )
})
