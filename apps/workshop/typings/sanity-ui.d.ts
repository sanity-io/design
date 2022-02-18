import {Theme} from '@sanity/ui'

declare module 'styled-components' {
  interface DefaultTheme {
    sanity: Theme
  }
}
