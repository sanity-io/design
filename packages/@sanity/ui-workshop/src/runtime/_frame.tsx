import React from 'react'
import {main_css} from './_templates'

export interface FrameProps {}

const frame_js = `
if (window.parent !== window) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
}
`

export default function Frame(_props: FrameProps): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <style>{main_css}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>{frame_js}</script>
        <script type="module" src="/.workshop/frame/main.tsx"></script>
      </body>
    </html>
  )
}
