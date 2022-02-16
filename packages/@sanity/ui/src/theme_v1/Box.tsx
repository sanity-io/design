import React from 'react'
import styled, {CSSObject} from 'styled-components'
import {ColorContext} from './ColorContext'
import {ColorProps} from './colorProps'
import {ThemeV1} from './theme'
import {useColorProps} from './useColorProps'

interface ThemeProps {
  theme: {sanity_v1: ThemeV1}
}

interface ColorStyleProps {
  $color: ColorProps
  $mode?: string
  $palette?: string
  $fg?: string
  $bg?: string
}

function colorBgStyle(props: ColorStyleProps & ThemeProps): CSSObject {
  const {$color, $mode: mode, $palette: palette, $bg: bg} = props

  if (!bg) {
    return {}
  }

  const theme = props.theme.sanity_v1

  const state = theme.color.state('enabled', {
    mode: mode || $color.mode || theme.color.mode,
    palette: palette || $color.palette || theme.color.palette,
    tone: bg || $color.tone || theme.color.tone,
  })

  return {
    '--sanity-bg-color': state.bg,
    backgroundColor: 'var(--sanity-bg-color)',
  }
}

function colorFgStyle(props: ColorStyleProps & ThemeProps): CSSObject {
  const {$color, $mode: mode, $palette: palette, $fg: fg} = props

  if (!fg) {
    return {}
  }

  const theme = props.theme.sanity_v1

  const state = theme.color.state('enabled', {
    mode: mode || $color.mode || theme.color.mode,
    palette: palette || $color.palette || theme.color.palette,
    tone: fg || $color.tone || theme.color.tone,
  })

  return {
    '--sanity-fg-color': state.fg,
    color: 'var(--sanity-fg-color)',
    '--sanity-border-color': state.border,
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

  const {contextProps, styleProps} = useColorProps({
    mode: modeProp,
    palette: paletteProp,
    tone: toneProp,
  })

  return (
    <ColorContext.Provider value={contextProps}>
      <BoxRoot
        {...restProps}
        $color={contextProps}
        $mode={styleProps.mode}
        $palette={styleProps.palette}
        $bg={bg || styleProps.tone}
        $fg={fg || styleProps.tone}
        data-bg={bg || styleProps.tone}
        data-fg={fg || styleProps.tone}
        data-mode={styleProps.mode}
        data-palette={styleProps.palette}
      >
        {children}
      </BoxRoot>
    </ColorContext.Provider>
  )
}
