import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'

export function textBaseStyle(
  props: {$accent?: boolean; $muted?: boolean} & ThemeProps
): FlattenSimpleInterpolation {
  const {$accent, $muted, theme} = props
  const {weights} = theme.sanity.fonts.text

  return css`
    color: var(--sanity-fg-color);

    ${$accent &&
    css`
      color: var(--sanity-accent-fg-color);
    `}

    ${$muted &&
    css`
      color: var(--sanity-muted-fg-color);
    `}

    & code {
      font-family: ${theme.sanity.fonts.code.family};
      border-radius: 1px;
      background-color: var(--sanity-code-bg-color);
      color: var(--sanity-code-fg-color);
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--sanity-link-color);
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow: 0 0 0 1px var(--sanity-bg-color), 0 0 0 3px var(--sanity-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & strong {
      font-weight: ${weights.bold};
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
