import React from 'react'
import styled, {CSSObject} from 'styled-components'
// import {ColorContext} from './ColorContext'
// import {ColorProps} from './colorProps'
import {ThemeV1} from './theme'
import {ThemeProvider} from './ThemeProvider'
import {useColorProps} from './useColorProps'

interface ThemeProps {
  theme: {sanity: ThemeV1}
}

interface ColorStyleProps {
  // $color: ColorProps
  // $mode?: string
  // $palette?: string
  $fg?: string
  $bg?: string
}

function colorBgStyle(props: ColorStyleProps & ThemeProps): CSSObject {
  const {
    // $mode: mode,
    // $palette: palette,
    $bg: bg,
    theme: {sanity: theme},
  } = props

  if (!bg) {
    return {}
  }

  const {
    color: {value: color},
  } = theme

  return {
    '--sanity-bg-color': color.states.enabled.bg,
    backgroundColor: 'var(--sanity-bg-color)',
  }
}

function colorFgStyle(props: ColorStyleProps & ThemeProps): CSSObject {
  const {
    // $mode: mode, $palette: palette,
    $fg: fg,
  } = props

  if (!fg) {
    return {}
  }

  const {
    color: {value: color},
  } = props.theme.sanity

  return {
    '--sanity-fg-color': color.states.enabled.fg,
    color: 'var(--sanity-fg-color)',
    '--sanity-border-color': color.states.enabled.border,
    borderColor: 'var(--sanity-border-color)',
  }
}

function boxStyle(): CSSObject {
  return {
    padding: '12px',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
    border: '4px solid var(--sanity-border-color)',

    pre: {
      fontFamily: 'ui-mono, SF Mono, Menlo, Consolas, monospace',
      margin: '0',
      fontSize: 12,
    },
  }
}

const BoxRoot = styled.div<ColorStyleProps & ThemeProps>(colorBgStyle, colorFgStyle, boxStyle)

interface BoxProps {
  bg?: string
  fg?: string
  mode?: string
  palette?: string
  tone?: string
}

export function Box(
  props: BoxProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>
): React.ReactElement {
  const {
    bg,
    children,
    fg,
    mode: modeProp,
    palette: paletteProp,
    tone: toneProp,
    ...restProps
  } = props

  const {
    // themeProps,
    styleProps,
  } = useColorProps({
    mode: modeProp,
    palette: paletteProp,
    tone: toneProp,
  })

  return (
    <ThemeProvider
      {...styleProps}
      // {...themeProps}
    >
      <BoxRoot
        {...restProps}
        // $color={themeProps}
        // $mode={styleProps.mode}
        // $palette={styleProps.palette}
        $bg={bg || styleProps.tone}
        $fg={fg || styleProps.tone}
        data-bg={bg || styleProps.tone}
        data-fg={fg || styleProps.tone}
        data-mode={styleProps.mode}
        data-palette={styleProps.palette}
      >
        {children}
      </BoxRoot>
    </ThemeProvider>
  )
}
