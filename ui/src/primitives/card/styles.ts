import {css} from 'styled-components'
import {ThemeProps} from '../../styles'
import {ThemeColorBase, ThemeColorCardState} from '../../theme'
import {CardStyleProps} from './types'

export function cardStyle(props: CardStyleProps & ThemeProps) {
  return [cardBaseStyle(props), cardColorStyle(props)]
}

export function cardBaseStyle(props: CardStyleProps & ThemeProps) {
  const {theme} = props
  const space = theme.sanity.space

  return css`
    background-size: ${space[3]}px ${space[3]}px;
    background-position: 50% 50%;

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

    /* &:is(pre) */
    &[data-as='pre'] {
      font: inherit;
    }
  `
}

function vars(base: ThemeColorBase, color: ThemeColorCardState, checkered: boolean) {
  // Custom properties that may be used by other atoms
  return css`
    ${!checkered &&
    css`
      --card-bg-color: ${color.bg};
      --card-bg-image: none;
    `}

    ${checkered &&
    css`
      --card-bg-color: ${color.bg};
      --card-bg-image: repeating-conic-gradient(${color.bg} 0% 25%, ${color.bg2} 0% 50%);
    `}

    /* --card-bg-color: ${checkered ? '' : color.bg}; */
    --card-fg-color: ${color.fg};
    --card-focus-ring-color: ${base.focusRing};
    --card-border-color: ${color.border};
    --card-muted-fg-color: ${color.muted.fg};
    --card-accent-fg-color: ${color.accent.fg};
    --card-link-fg-color: ${color.link.fg};
    --card-code-bg-color: ${color.code.bg};
    --card-code-fg-color: ${color.code.fg};

    /* @todo: deprecate */
    --card-link-color: ${color.link.fg};
    --card-hairline-soft-color: ${color.border};
    --card-hairline-hard-color: ${color.border};

    /* @todo: rename to "--base-"? */
    --card-shadow-outline-color: ${base.shadow.outline};
    --card-shadow-umbra-color: ${base.shadow.umbra};
    --card-shadow-penumbra-color: ${base.shadow.penumbra};
    --card-shadow-ambient-color: ${base.shadow.ambient};
  `
}

export function cardColorStyle(props: CardStyleProps & ThemeProps) {
  const {$checkered, theme} = props
  const {base, card} = theme.sanity.color

  return css`
    ${vars(base, card.enabled, $checkered)}

    background-color: var(--card-bg-color);
    background-image: var(--card-bg-image);
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${vars(base, card.disabled, $checkered)}
      }

      &:not(:disabled) {
        @media (hover: hover) {
          &:hover {
            ${vars(base, card.hovered, $checkered)}
          }

          &:active {
            ${vars(base, card.pressed, $checkered)}
          }
        }

        &:focus {
          ${vars(base, card.selected, $checkered)}
        }

        &[aria-pressed='true'],
        [aria-selected='true'] > & {
          ${vars(base, card.selected, $checkered)}
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${vars(base, card.disabled, $checkered)}
      }

      &:not([data-disabled]) {
        @media (hover: hover) {
          outline: none;

          &:hover {
            ${vars(base, card.hovered, $checkered)}
          }

          &:active {
            ${vars(base, card.pressed, $checkered)}
          }
        }

        &:focus {
          ${vars(base, card.selected, $checkered)}
        }

        [aria-selected='true'] > & {
          ${vars(base, card.selected, $checkered)}
        }
      }
    }

    ${theme.sanity.styles?.card?.root}
  `
}
