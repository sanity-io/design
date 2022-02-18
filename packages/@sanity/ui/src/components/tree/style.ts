import {css, FlattenSimpleInterpolation} from 'styled-components'
import {rem, ThemeProps} from '../../styles'
import {_colorVarsStyle} from '../../styles/colorVars'

export function treeItemRootStyle(): FlattenSimpleInterpolation {
  return css`
    &[role='none'] > [role='treeitem'] {
      outline: none;
      cursor: default;
      border-radius: 3px;

      &:focus {
        position: relative;
      }
    }

    &[role='treeitem'] {
      outline: none;

      & > div {
        cursor: default;
        border-radius: 3px;
      }

      &:focus > div {
        position: relative;
      }
    }
  `
}

export function treeItemRootColorStyle(props: ThemeProps): FlattenSimpleInterpolation {
  const {
    theme: {sanity: theme},
  } = props
  // const $tone = 'default'
  const {mode} = theme.color
  const states = mode.tones.default.states

  // const {base, muted, selectable} = theme.sanity.color
  // @todo: remove use of `muted` here
  // const tone = selectable ? selectable[$tone] || selectable.default : muted[$tone] || muted.default

  return css`
    /* <div role="none"><a data-ui="TreeItem__box" role="treeitem" tabIndex="0"></div> */
    &[role='none'] {
      & > [role='treeitem'] {
        ${_colorVarsStyle(mode, states.enabled)}

        background-color: var(--sanity-bg-color);
        color: var(--treeitem-fg-color);
      }

      &[data-selected] > [role='treeitem'] {
        ${_colorVarsStyle(mode, states.pressed)}
      }

      @media (hover: hover) {
        &:not([data-selected]) > [role='treeitem']:not(:focus):hover {
          ${_colorVarsStyle(mode, states.hovered)}
        }

        & > [role='treeitem']:focus {
          ${_colorVarsStyle(mode, states.selected)}
        }
      }
    }

    /* <div role="treeitem" tabIndex="0"><div data-ui="TreeItem__box"></div> */
    &[role='treeitem'] {
      & > [data-ui='TreeItem__box'] {
        ${_colorVarsStyle(mode, states.enabled)}

        background-color: var(--sanity-bg-color);
        color: var(--sanity-fg-color);
      }

      &[data-selected] > [data-ui='TreeItem__box'] {
        ${_colorVarsStyle(mode, states.pressed)}
      }

      @media (hover: hover) {
        &:not([data-selected]):not(:focus) > [data-ui='TreeItem__box']:hover {
          ${_colorVarsStyle(mode, states.hovered)}
        }

        &:focus > [data-ui='TreeItem__box'] {
          ${_colorVarsStyle(mode, states.selected)}
        }
      }
    }
  `
}

export interface TreeItemBoxStyleProps {
  $level: number
}

export function treeItemBoxStyle(
  props: TreeItemBoxStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$level, theme} = props
  const {space} = theme.sanity

  return css`
    padding-left: ${rem(space[2] * $level)};

    &[data-as='a'] {
      text-decoration: none;
    }
  `
}
