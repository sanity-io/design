import React from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {ThemeV1} from './theme'

interface ThemeProviderProps {
  children?: React.ReactNode
  theme: ThemeV1
}

export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
  const {children, theme} = props

  return <StyledThemeProvider theme={{sanity_v1: theme} as any}>{children}</StyledThemeProvider>
}
