import {CSSObject} from 'styled-components'
import {ThemeProps} from '../../styles'
import {BadgeStyleProps} from './types'

export function badgeStyle(props: BadgeStyleProps & ThemeProps): CSSObject {
  const {
    // $mode,
    // $tone,
    theme: {sanity: theme},
  } = props
  const color = theme.color.mode.states

  // const palette = theme.color[$mode === 'outline' ? 'muted' : 'solid']
  // const color = palette[$tone] || palette.default

  return {
    backgroundColor: color.enabled.bg,
    color: color.enabled.fg,
    boxShadow: `inset 0 0 0 1px ${color.enabled.border}`,
    cursor: 'default',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  }
}
