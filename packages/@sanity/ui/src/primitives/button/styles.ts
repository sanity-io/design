import {css, CSSObject, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/internal'
// import {ButtonMode, ButtonTone} from '../../types'

/**
 * @internal
 */
export function buttonBaseStyles(): FlattenSimpleInterpolation {
  return css`
    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-flex;
    align-items: center;
    font: inherit;
    border: 0;
    outline: none;
    user-select: none;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-align: left;
    position: relative;

    & > span {
      display: block;
      flex: 1;
      min-width: 0;
      border-radius: inherit;
    }

    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  `
}

const buttonTheme = {border: {width: 1}}

/**
 * @internal
 */
export function buttonColorStyles(
  props: {
    $mode: string
    $tone: string
    // $mode: ButtonMode; $tone: ButtonTone
  } & ThemeProps
): CSSObject[] {
  const {
    $mode,
    $tone,
    theme: {sanity: theme},
  } = props
  const {focusRing} = theme

  // const base = theme.sanity.color.base
  // const mode = theme.sanity.color.button[$mode] || theme.sanity.color.button.default
  // const color = mode[props.$tone] || mode.default
  const border = {width: buttonTheme.border.width, color: 'var(--sanity-border-color)'}

  const {palette} = theme.color

  if (!palette) throw new Error('buttonColorStyles: missing palette')

  const tone = palette[$tone] || palette.default

  if (!tone) throw new Error('buttonColorStyles: missing tone')

  const mode = tone[$mode] || tone.default

  // const {mode} = theme.color
  const {states} = mode.tones[$tone] || mode.tones.default

  // const {palette} = theme.color

  // if (!palette) throw new Error('buttonColorStyles: missing palette')

  // const tone = palette[$tone] || palette.default

  // if (!tone) throw new Error('buttonColorStyles: missing tone')

  // const mode = tone[$mode] || tone.default

  if (!mode) {
    console.log({$mode, palette})
    throw new Error('buttonColorStyles: missing mode')
  }

  // mode.tones

  // const {states} = mode || {}

  if (!states) return [{}]

  // const {mode} = theme.color
  // const color = mode.tones.default.states

  return [
    _colorVarsStyle(mode, states.enabled),
    {
      backgroundColor: 'var(--sanity-bg-color)',
      color: 'var(--sanity-fg-color)',
      boxShadow: focusRingBorderStyle(border),
      '&:disabled, &[data-disabled="true"]': _colorVarsStyle(mode, states.disabled),
      "&:not([data-disabled='true'])": {
        '&:focus': {
          boxShadow: focusRingStyle({base: mode, border, focusRing}),
        },
        '&:focus:not(:focus-visible)': {
          boxShadow: focusRingBorderStyle(border),
        },
        '@media (hover: hover)': {
          '&:hover': _colorVarsStyle(mode, states.hovered),
          '&:active': _colorVarsStyle(mode, states.pressed),
        },
        '&[data-selected]': _colorVarsStyle(mode, states.pressed),
      },
    },
    // theme.styles?.button?.root,
  ].filter(Boolean) as CSSObject[]
}
