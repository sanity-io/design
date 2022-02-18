import {
  studioTheme,
  // ThemeColorProvider,
  ThemeProvider,
  useGlobalKeyDown,
  usePrefersDark,
} from '@sanity/ui'
import {Workshop, WorkshopLocation} from '@sanity/ui-workshop'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import ReactDOM from 'react-dom'
import Refractor from 'react-refractor'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {createGlobalStyle} from 'styled-components'
import {LocationProvider, useLocation} from './location'
import {scopes} from '$workshop'

Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

const WORKSHOP_COLLECTIONS: {name: string; title: string}[] = [
  {
    name: 'components',
    title: 'Components',
  },
  {
    name: 'hooks',
    title: 'Hooks',
  },
  {
    name: 'primitives',
    title: 'Primitives',
  },
  {
    name: 'utils',
    title: 'Utils',
  },
]

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({theme}) => theme.sanity.color.mode.tones.default.states.enabled.bg}
  }
`

function Root() {
  const {path, pushState, query, replaceState} = useLocation()

  const handleLocationPush = useCallback(
    (newLoc: WorkshopLocation) => pushState(newLoc),
    [pushState]
  )

  const handleLocationReplace = useCallback(
    (newLoc: WorkshopLocation) => replaceState(newLoc),
    [replaceState]
  )

  const studioLocation: WorkshopLocation = useMemo(() => ({path, query}), [path, query])

  const prefersDark = usePrefersDark()
  const [scheme, setScheme] = useState<'light' | 'dark'>(prefersDark ? 'dark' : 'light')

  useEffect(() => {
    setScheme(prefersDark ? 'dark' : 'light')
  }, [prefersDark])

  useGlobalKeyDown((event) => {
    if (event.metaKey && event.key === 'i') {
      setScheme((v) => (v === 'light' ? 'dark' : 'light'))
    }
  })

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <ThemeProvider mode="muted">
        <GlobalStyle />
      </ThemeProvider>
      <Workshop
        collections={WORKSHOP_COLLECTIONS}
        frameUrl="/frame/"
        location={studioLocation}
        onLocationPush={handleLocationPush}
        onLocationReplace={handleLocationReplace}
        scheme={scheme}
        scopes={scopes}
        setScheme={setScheme}
        title="Sanity UI"
      />
    </ThemeProvider>
  )
}

ReactDOM.render(
  <LocationProvider>
    <Root />
  </LocationProvider>,
  document.getElementById('root')
)
