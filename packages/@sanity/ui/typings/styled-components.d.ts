// import {Theme} from '../src'
import {ThemeV1} from '../src/theme_v1/theme'

declare module 'styled-components' {
  interface DefaultTheme {
    sanity: ThemeV1
  }
}
