import {css, CSSObject, FlattenSimpleInterpolation} from 'styled-components'
import {getResponsiveProp, rem, responsive, ThemeProps} from '../../styles'
import {
  focusRingBorderStyle,
  focusRingStyle,
  responsiveInputPaddingIconRightStyle,
  responsiveRadiusStyle,
  ResponsiveRadiusStyleProps,
} from '../../styles/internal'
import {ThemeFontSize} from '../../theme'

function rootStyle(): FlattenSimpleInterpolation {
  return css`
    position: relative;
    width: stretch;

    &:not([hidden]) {
      display: inline-block;
    }
  `
}

function inputBaseStyle(props: ThemeProps): FlattenSimpleInterpolation {
  const {theme} = props
  const font = theme.sanity.fonts.text

  return css`
    -webkit-font-smoothing: antialiased;
    appearance: none;
    border: 0;
    font-family: ${font.family};
    color: inherit;
    width: 100%;
    outline: none;
    margin: 0;

    &:disabled {
      opacity: 1;
    }
  `
}

function inputColorStyle(props: ThemeProps) {
  const {
    theme: {sanity: theme},
  } = props
  const {focusRing, input} = theme
  const color = theme.color.mode.input

  return css`
    /* enabled */
    background-color: ${color.valid.enabled.bg};
    color: ${color.valid.enabled.fg};
    box-shadow: ${focusRingBorderStyle({
      color: color.valid.enabled.border,
      width: input.border.width,
    })};

    /* hovered */
    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${color.valid.hovered.bg};
        color: ${color.valid.hovered.fg};
        box-shadow: ${focusRingBorderStyle({
          color: color.valid.hovered.border,
          width: input.border.width,
        })};
      }
    }

    /* focused */
    &:not(:disabled):focus {
      box-shadow: ${focusRingStyle({
        border: {width: input.border.width, color: color.valid.enabled.border},
        focusRing,
      })};
    }

    /* read-only */
    &[data-read-only] {
      background-color: ${color.valid.readOnly.bg};
      color: ${color.valid.readOnly.fg};
      box-shadow: ${focusRingBorderStyle({
        color: color.valid.readOnly.border,
        width: input.border.width,
      })};
    }

    /* disabled */
    &:not([data-read-only]):disabled {
      background-color: ${color.valid.disabled.bg};
      color: ${color.valid.disabled.fg};
      box-shadow: ${focusRingBorderStyle({
        color: color.valid.disabled.border,
        width: input.border.width,
      })};
    }
  `
}

function textSize(size: ThemeFontSize) {
  return {fontSize: rem(size.fontSize), lineHeight: rem(size.lineHeight)}
}

function inputTextSizeStyle(props: {$fontSize?: number | number[]} & ThemeProps) {
  const {theme, $fontSize} = props
  const {sizes} = theme.sanity.fonts.text

  return responsive(theme.sanity.media, getResponsiveProp($fontSize), (sizeIndex) =>
    textSize(sizes[sizeIndex] || sizes[2])
  )
}

function inputStyle(): Array<
  | ((props: ResponsiveRadiusStyleProps & ThemeProps) => CSSObject[])
  | ((props: ThemeProps) => FlattenSimpleInterpolation)
> {
  return [
    responsiveRadiusStyle,
    inputBaseStyle,
    inputColorStyle,
    inputTextSizeStyle,
    responsiveInputPaddingIconRightStyle,
  ]
}

function iconBoxStyle(props: ThemeProps): FlattenSimpleInterpolation {
  const {
    theme: {sanity: theme},
  } = props

  const color = theme.color.mode.input

  return css`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    /* enabled */
    --sanity-fg-color: ${color.valid.enabled.fg};

    /* hover */
    @media (hover: hover) {
      select:not(disabled):not(:read-only):hover + && {
        --sanity-fg-color: ${color.valid.hovered.fg};
      }
    }

    /* disabled */
    select:disabled + && {
      --sanity-fg-color: ${color.valid.disabled.fg};
    }

    /* read-only */
    select[data-read-only] + && {
      --sanity-fg-color: ${color.valid.readOnly.fg};
    }
  `
}

export const selectStyle = {
  root: rootStyle,
  input: inputStyle,
  iconBox: iconBoxStyle,
}
