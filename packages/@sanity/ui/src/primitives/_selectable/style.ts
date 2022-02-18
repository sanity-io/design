import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'
// import {SelectableTone} from '../../types/selectable'

/**
 * @internal
 */
export interface SelectableStyleProps {
  // $tone: SelectableTone
}

export function selectableBaseStyle(): FlattenSimpleInterpolation {
  return css`
    background-color: inherit;
    color: inherit;

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
      text-decoration: none;
    }
  `
}

export function selectableColorStyle(
  props: SelectableStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {
    // $tone,
    theme: {sanity: theme},
  } = props

  const {mode} = theme.color
  // const color = mode.states

  // const {base, muted, selectable} = theme.sanity.color
  // @todo: remove use of `muted` here
  // const tone = selectable ? selectable[$tone] || selectable.default : muted[$tone] || muted.default

  return css`
    ${_colorVarsStyle(mode, mode.states.disabled)}

    background-color: var(--sanity-bg-color);
    color: var(--sanity-fg-color);
    outline: none;

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${_colorVarsStyle(mode, mode.states.disabled)}
      }

      &:not(:disabled) {
        &[aria-pressed='true'] {
          ${_colorVarsStyle(mode, mode.states.pressed)}
        }

        &[data-selected],
        &[aria-selected='true'] > & {
          ${_colorVarsStyle(mode, mode.states.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &:hover {
              ${_colorVarsStyle(mode, mode.states.hovered)}
            }

            &:active {
              ${_colorVarsStyle(mode, mode.states.pressed)}
            }
          }
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${_colorVarsStyle(mode, mode.states.disabled)}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${_colorVarsStyle(mode, mode.states.pressed)}
        }

        &[data-selected] {
          ${_colorVarsStyle(mode, mode.states.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &:hover {
              ${_colorVarsStyle(mode, mode.states.hovered)}
            }

            &:active {
              ${_colorVarsStyle(mode, mode.states.pressed)}
            }
          }
        }
      }
    }

    ${/* theme.styles?.card?.root */ {}}
  `
}
