import {Theme, ThemeProvider} from '@sanity/ui'
import React from 'react'
import {createGlobalStyle, css} from 'styled-components'
import {App} from './App'
import {theme} from './themes/studio'

const GlobalStyle = createGlobalStyle((props: {theme: {sanity: Theme}}) => {
  const {theme} = props
  const {color} = theme.sanity

  return css`
    html,
    body,
    #root {
      height: 100%;
    }

    body {
      -webkit-font-smoothing: antialiased;
      background-color: ${color.mode.tones.default.states.enabled.bg};
      color: ${color.mode.tones.default.states.enabled.fg};
      margin: 0;
    }
  `
})

export function Root() {
  const scheme = 'light'

  return (
    <ThemeProvider mode="muted" palette="default" theme={theme} tone="primary" scheme={scheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  )
}
