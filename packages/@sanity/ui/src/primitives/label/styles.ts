import {css, FlattenSimpleInterpolation} from 'styled-components'
import {ThemeProps} from '../../styles'

export function labelBaseStyle(
  props: {$accent?: boolean; $muted: boolean} & ThemeProps
): FlattenSimpleInterpolation {
  const {$accent, $muted, theme} = props
  const {fonts} = theme.sanity

  return css`
    text-transform: uppercase;

    ${$accent &&
    css`
      color: var(--sanity-accent-fg-color);
    `}

    ${$muted &&
    css`
      color: var(--sanity-muted-fg-color);
    `}

    & code {
      font-family: ${fonts.code.family};
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `
}
