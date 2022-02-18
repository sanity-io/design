import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'
import {HeadingStyleProps} from './types'

export function headingBaseStyle(
  props: HeadingStyleProps & ThemeProps
): FlattenSimpleInterpolation {
  const {$accent, $muted, theme} = props

  return css`
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

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
