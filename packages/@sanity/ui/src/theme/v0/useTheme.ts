import {useTheme as useStyledTheme} from 'styled-components'
import {ThemeV1} from '../v1/theme'

// import {Theme} from './types'

/**
 * @public
 */
export function useTheme(): ThemeV1 {
  return useStyledTheme().sanity
}
