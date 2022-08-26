import {hues, white} from '@sanity/color'
import {SanityMonogram} from '@sanity/logos'
import React from 'react'
import {useDataset} from 'sanity'

export function StudioLogo() {
  const dataset = useDataset()

  return (
    <SanityMonogram
      color={
        dataset === 'production'
          ? undefined
          : {
              bg1: hues.gray[500].hex,
              bg2: hues.gray[200].hex,
              fg: white.hex,
            }
      }
      style={{
        display: 'block',
        height: 'calc(2rem - 5px)',
        margin: -8,
      }}
    />
  )
}
