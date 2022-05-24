
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
// import {GlobalStyle} from '../GlobalStyle'
// import $config from '$config'
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
