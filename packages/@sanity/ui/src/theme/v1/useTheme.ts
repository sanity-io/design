import {useTheme as useStyledTheme} from 'styled-components'
import {ThemeV1} from './theme'

export function useTheme(): ThemeV1 {
  const styledTheme = useStyledTheme() as {sanity?: ThemeV1} | undefined

  if (!styledTheme) {
    throw new Error('Theme: missing theme value')
  }

  if (!styledTheme.sanity) {
    throw new Error('Theme: missing `sanity` theme value')
  }

  return styledTheme.sanity
}
