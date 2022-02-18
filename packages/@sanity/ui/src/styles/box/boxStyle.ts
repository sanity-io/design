import {Property} from 'csstype'
import {CSSObject} from 'styled-components'
import {getResponsiveProp, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveBoxStyleProps} from './types'

export interface BoxStyleProps {
  $bg?: string
  $fg?: string
}

const BASE_STYLE: CSSObject = {
  '&[data-as="ul"],&[data-as="ol"]': {
    listStyle: 'none',
  },
}

const BOX_SIZING: {[key: string]: Property.BoxSizing} = {
  content: 'content-box',
  border: 'border-box',
}

const BOX_HEIGHT = {
  stretch: 'stretch',
  fill: '100%',
}

export function boxStyle(): CSSObject {
  return BASE_STYLE
}

// export function boxBorderStyle(props: ResponsiveBoxStyyl): CSSObject {
//   const {$border} = props

//   if (!$border) return {}

//   return {
//     border: '1px solid var(--sanity-border-color)',
//   }
// }

export function boxFgStyle(props: BoxStyleProps & ThemeProps): CSSObject {
  const {
    $fg,
    theme: {sanity: theme},
  } = props

  if ($fg) {
    const tone = theme.color.palette[$fg || theme.color.config.tone || 'default']
    const mode = tone?.[theme.color.config.mode || 'default']?.tones.default
    const color = mode?.states.enabled

    return {
      '--sanity-fg-color': color?.fg,
      '--sanity-border-color': color?.border,
      '--sanity-code-fg-color': color?.code.fg,

      '--sanity-shadow-ambient-color': mode?.shadow.ambient,
      '--sanity-shadow-outline-color': mode?.shadow.outline,
      '--sanity-shadow-penumbra-color': mode?.shadow.penumbra,
      '--sanity-shadow-umbra-color': mode?.shadow.umbra,

      color: 'var(--sanity-fg-color)',
    }
  }

  return {}
}

export function boxBgStyle(props: BoxStyleProps & ThemeProps): CSSObject {
  const {
    $bg,
    theme: {sanity: theme},
  } = props

  if ($bg) {
    const tone = theme.color.palette[$bg || theme.color.config.tone || 'default']
    const mode = tone?.[theme.color.config.mode || 'default']?.tones.default
    const color = mode?.states.enabled

    return {
      '--sanity-bg-color': color?.bg,
      backgroundColor: 'var(--sanity-bg-color)',

      '--sanity-code-bg-color': color?.code.bg,
    }
  }

  return {}
}

export function responsiveBoxStyle(): Array<
  (props: ResponsiveBoxStyleProps & ThemeProps) => CSSObject[]
> {
  return [
    responsiveBoxSizingStyle,
    responsiveBoxHeightStyle,
    responsiveBoxOverflowStyle,
    responsiveBoxDisplayStyle,
  ]
}

function responsiveBoxDisplayStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$display), (display) => ({
    '&:not([hidden])': {display},
  }))
}

function responsiveBoxSizingStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$sizing), (sizing) => ({
    boxSizing: BOX_SIZING[sizing],
  }))
}

function responsiveBoxHeightStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$height), (height) => ({
    height: BOX_HEIGHT[height],
  }))
}

function responsiveBoxOverflowStyle(props: ResponsiveBoxStyleProps & ThemeProps) {
  const {theme} = props
  const {media} = theme.sanity

  return responsive(media, getResponsiveProp(props.$overflow), (overflow) => ({
    overflow,
  }))
}
