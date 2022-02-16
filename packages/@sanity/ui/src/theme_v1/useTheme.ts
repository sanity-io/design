import {useTheme as useStyledTheme} from 'styled-components'
import {ThemeV1} from './theme'

export function useTheme(): ThemeV1 {
  const styledTheme = useStyledTheme()

  return (styledTheme as any).sanity_v1
}
