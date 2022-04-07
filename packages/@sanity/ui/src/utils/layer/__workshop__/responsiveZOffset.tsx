import React from 'react'
import {Card} from '../../../primitives'
import {Layer} from '../layer'
import {LayerDebugInfo} from './_debug'

export default function ResponsiveZOffsetStory() {
  return (
    <Layer id="responsive-layer" zOffset={[1, 2, 3, 4, 5, 6, 7]}>
      <Card padding={[1, 2, 3, 4, 5, 6, 7]} shadow={1}>
        <LayerDebugInfo />
      </Card>
    </Layer>
  )
}
