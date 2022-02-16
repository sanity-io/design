import React, {useContext} from 'react'
import {Flex} from '../../primitives'
import {Box} from '../Box'
import {ColorContext} from '../ColorContext'
import {ThemeProvider} from '../ThemeProvider'
import {theme} from '../themes/vercel'

const PALETTES = ['default', 'brand', 'accent']
const TONES = ['default', 'primary', 'positive', 'caution', 'critical']

export default function DevStory(): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <Flex>
        {PALETTES.map((palette) => (
          <div key={palette} style={{flex: 1}}>
            {TONES.map((tone) => (
              <Box
                key={tone}
                // mode="default"
                palette={palette}
                tone={tone}
              >
                <DebugColor />
                <Box mode="muted">
                  <DebugColor />
                </Box>
                <Box mode="solid">
                  <DebugColor />
                </Box>
              </Box>
            ))}
          </div>
        ))}
      </Flex>
    </ThemeProvider>
  )
}

function DebugColor() {
  const color = useContext(ColorContext)

  return <pre>{JSON.stringify(color)}</pre>
}
