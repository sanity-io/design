import React from 'react'
import {main_css} from './_templates'

export interface DocumentProps {
  title?: string
}

export default function Document(props: DocumentProps): React.ReactElement {
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
        <title>{props.title || 'Workshop'}</title>
        <style>{main_css}</style>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/.workshop/main.tsx"></script>
      </body>
    </html>
  )
}
