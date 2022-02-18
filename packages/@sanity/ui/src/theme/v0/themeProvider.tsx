import React, {useContext, useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider} from 'styled-components'
import {ThemeContext} from '../ThemeContext'
import {
  // BaseTheme,
  // Theme,
  ThemeContextValue_V0,
} from '../types'
import {ThemeV0 as BaseTheme} from './lib/theme'
// import {DEFAULT_THEME_LAYER} from './defaults'
import {ThemeColorSchemeKey, ThemeColorName} from './lib/theme'

/**
 * @public
 */
export interface ThemeProviderProps {
  children?: React.ReactNode
  scheme?: ThemeColorSchemeKey
  theme?: BaseTheme
  tone?: ThemeColorName
}

/**
 * @public
 */
export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
  const parentTheme = useContext(ThemeContext)

  if (parentTheme && parentTheme.version !== 0) {
    throw new Error(`the theme version is not supported in v0: ${parentTheme.version}`)
  }

  const {
    children,
    scheme = parentTheme?.scheme || 'light',
    theme = parentTheme?.theme || null,
    tone = parentTheme?.tone || 'default',
  } = props

  if (!theme) {
    throw new Error('missing theme value')
  }

  // const theme: Theme | null = useMemo(() => {
  //   if (!themeProp) return null

  //   const {color: rootColor, layer: rootLayer, ...restTheme} = themeProp
  //   const colorScheme = rootColor[scheme] || rootColor.light
  //   const color = colorScheme[tone] || colorScheme.default
  //   const layer = rootLayer || DEFAULT_THEME_LAYER

  //   return {sanity: {...restTheme, color, layer}}
  // }, [scheme, themeProp, tone])

  const value: ThemeContextValue_V0 | null = useMemo(
    () =>
      theme && {
        version: 0.0,
        theme,
        scheme,
        tone,
      },
    [theme, scheme, tone]
  )

  const styledTheme = useMemo(() => ({sanity: theme}), [theme])

  if (!theme) {
    return <pre>ThemeProvider: no "theme" property provided</pre>
  }

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
