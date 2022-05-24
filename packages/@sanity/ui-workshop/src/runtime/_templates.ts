export const main_css = `
html {
  text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}
html,
body,
#root {
  height: 100%;
}
body {
  margin: 0;
}
#root {
  -webkit-font-smoothing: antialiased;
}
`

export const main_tsx = `
import {
  studioTheme,
  ThemeColorProvider,
  ThemeColorSchemeKey,
  ThemeProvider,
  useGlobalKeyDown,
  usePrefersDark,
} from '@sanity/ui'
import {createLocationStore, Workshop} from '@sanity/ui-workshop'
import React, {useEffect, useMemo, useState} from 'react'
import ReactDOM from 'react-dom'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import config from '../workshop.config'
import {scopes} from './_scopes'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

const workshopConfig = {...config, scopes}

function Root() {
  const locationStore = useMemo(() => createLocationStore(), [])
  const prefersDark = usePrefersDark()

  const [scheme, setScheme] = useState<ThemeColorSchemeKey>(() => {
    const loc = locationStore.get()

    if (loc.query?.scheme) {
      return loc.query.scheme as ThemeColorSchemeKey
    }

    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const loc = locationStore.get()

    if (!loc.query?.scheme) {
      setScheme(prefersDark ? 'dark' : 'light')
    }
  }, [locationStore, prefersDark])

  useGlobalKeyDown((event) => {
    if (event.metaKey && event.key === 'i') {
      setScheme((v) => (v === 'light' ? 'dark' : 'light'))
    }
  })

  useEffect(() => {
    return locationStore.subscribe((loc) => {
      if (!loc.query?.scheme) {
        setScheme(prefersDark ? 'dark' : 'light')
      }
    })
  }, [locationStore, prefersDark])

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      <ThemeColorProvider tone="transparent">
        {/* <GlobalStyle /> */}
      </ThemeColorProvider>
      <Workshop
        config={workshopConfig}
        locationStore={locationStore}
        scheme={scheme}
        onSchemeChange={setScheme}
      />
    </ThemeProvider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
`

export const frame_main_tsx = `
import {studioTheme, ThemeColorSchemeKey, ThemeProvider} from '@sanity/ui'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {WorkshopFrame} from '@sanity/ui-workshop'
import config from '../../workshop.config'
import {scopes} from '../_scopes'

const workshopConfig = {...config, scopes}

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

ReactDOM.render(<Root />, document.getElementById('root'))

function Root() {
  const [scheme, setScheme] = useState<ThemeColorSchemeKey>('light')

  return (
    <ThemeProvider scheme={scheme} theme={studioTheme}>
      {/* <GlobalStyle /> */}
      <WorkshopFrame config={workshopConfig} setScheme={setScheme} />
    </ThemeProvider>
  )
}
`
