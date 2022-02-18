import React, {useMemo} from 'react'
import {ThemeProvider as StyledThemeProvider, useTheme} from 'styled-components'
import {ThemeContext} from '../ThemeContext'
import {ThemeContextValue_V1} from '../types'
import {ThemeV1} from './theme'
// import {useTheme} from './useTheme'

interface ThemeProviderProps {
  children?: React.ReactNode
  mode?: string
  palette?: string
  scheme?: string
  tone?: string
  theme?: ThemeV1
}

export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
  // const parentTheme = useTheme()
  const _parent = useTheme()?.sanity as ThemeV1 | undefined
  const {
    children,
    mode = _parent?.color.config.mode ?? 'default',
    palette = _parent?.color.config.palette ?? 'default',
    scheme = _parent?.color.config.scheme ?? 'light',
    theme: themeProp = _parent,
    tone = _parent?.color.config.tone ?? 'default',
  } = props

  if (!themeProp) {
    throw new Error('ThemeProvider: missing `theme` property')
  }

  const theme: {sanity: ThemeV1} = useMemo(() => {
    const schemes = themeProp?.color._options.scheme
    const _scheme = schemes?.[scheme] || schemes?.light
    const _palette = _scheme?.[palette] || _scheme?.default
    const _tone = _palette?.[tone] || _palette?.default
    const _mode = _tone?.[mode] || _tone?.default

    try {
      if (!_scheme) throw new Error('Theme: could not resolve scheme')
      if (!_palette) throw new Error('Theme: could not resolve palette')
      if (!_tone) throw new Error('Theme: could not resolve tone')
      if (!_mode) throw new Error('Theme: could not resolve mode')
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('theme', {props: {theme: themeProp, scheme: scheme || 'light'}, schemes})
      throw err
    }

    return {
      sanity: {
        ...themeProp,
        _parent,

        color: {
          ...themeProp.color,
          config: {
            mode,
            palette,
            scheme,
            tone,
          },

          mode: _mode,
          palette: _palette,
          scheme: _scheme,
          tone: _tone,
        },
      },
    }
  }, [_parent, mode, palette, scheme, themeProp, tone])

  const value: ThemeContextValue_V1 = useMemo(() => {
    return {version: 1.0, theme: theme.sanity}
  }, [theme])

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
