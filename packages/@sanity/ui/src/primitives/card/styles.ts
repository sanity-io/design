import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
import {focusRingBorderStyle, focusRingStyle} from '../../styles/focusRing'
import {CardStyleProps} from './types'

export function cardStyle(
  props: CardStyleProps & ThemeProps
): Array<FlattenSimpleInterpolation | (() => FlattenSimpleInterpolation)> {
  return [cardBaseStyle(props), cardColorStyle(props)]
}

export function cardBaseStyle(props: CardStyleProps & ThemeProps): FlattenSimpleInterpolation {
  const {$checkered, theme} = props
  const space = theme.sanity.space

  return css`
    ${$checkered &&
    css`
      background-size: ${space[3]}px ${space[3]}px;
      background-position: 50% 50%;
      background-image: var(--sanity-bg-image);
    `}

    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      outline: none;
      text-decoration: none;
    }

    /* &:is(pre) */
    &[data-as='pre'] {
      font: inherit;
    }
  `
}

export function cardColorStyle(props: CardStyleProps & ThemeProps): FlattenSimpleInterpolation {
  const {
    $checkered,
    $focusRing,
    theme: {sanity: theme},
  } = props
  const {focusRing} = theme
  // const {base, card} = theme.sanity.color
  const border = {width: 0, color: 'var(--sanity-border-color)'}

  const {mode} = theme.color
  const color = mode.states

  return css`
    ${_colorVarsStyle(mode, color.enabled, $checkered)}

    background-color: var(--sanity-bg-color);
    color: var(--sanity-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      --sanity-focus-ring-box-shadow: none;

      cursor: default;
      box-shadow: var(--sanity-focus-ring-box-shadow);

      &:disabled {
        ${_colorVarsStyle(mode, color.disabled, $checkered)}
      }

      &:not(:disabled) {
        &[data-pressed] {
          ${_colorVarsStyle(mode, color.pressed, $checkered)}
        }

        &[data-selected] {
          ${_colorVarsStyle(mode, color.selected, $checkered)}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &:hover {
              ${_colorVarsStyle(mode, color.hovered, $checkered)}
            }

            &:active {
              ${_colorVarsStyle(mode, color.pressed, $checkered)}
            }
          }
        }

        &:focus {
          --sanity-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({base: mode, border, focusRing})
            : undefined};
        }

        &:focus:not(:focus-visible) {
          --sanity-focus-ring-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      cursor: pointer;
      box-shadow: var(--sanity-focus-ring-box-shadow);

      &[data-disabled] {
        ${_colorVarsStyle(mode, color.disabled, $checkered)}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${_colorVarsStyle(mode, color.pressed, $checkered)}
        }

        &[data-selected] {
          ${_colorVarsStyle(mode, color.selected, $checkered)}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &:hover {
              ${_colorVarsStyle(mode, color.hovered, $checkered)}
            }

            &:active {
              ${_colorVarsStyle(mode, color.pressed, $checkered)}
            }
          }
        }

        &:focus {
          --sanity-focus-ring-box-shadow: ${$focusRing
            ? focusRingStyle({base: mode, border, focusRing})
            : undefined};
        }

        &:focus:not(:focus-visible) {
          --sanity-focus-ring-box-shadow: ${$focusRing ? focusRingBorderStyle(border) : undefined};
        }
      }
    }

    ${/* theme.styles?.card?.root */ {}}
  `
}
