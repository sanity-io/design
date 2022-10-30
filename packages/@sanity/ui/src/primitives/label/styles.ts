import {CSSObject, ThemeProps} from '../../styles'

export function labelBaseStyle(props: {$muted: boolean} & ThemeProps): CSSObject {
  const {$muted, theme} = props
  const {fonts} = theme.sanity

  return {
    textTransform: 'uppercase',

    color: $muted ? 'var(--card-muted-fg-color)' : undefined,

    '& code': {
      fontFamily: fonts.code.family,
      borderRadius: '1px',
    },

    '& a': {
      textDecoration: 'none',
      borderRadius: '1px',
    },

    '& [data-sanity-icon]': {
      verticalAlign: 'baseline',
    },
  }
}
