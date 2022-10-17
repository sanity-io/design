import {Card, Layer, LayerProvider, Stack} from '@sanity/ui'
import {LayerDebugInfo} from './_debug'

export default function MultipleRootsStory() {
  return (
    <Stack padding={6} space={4}>
      <LayerProvider zOffset={100}>
        <Card padding={3} shadow={1}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>
      <LayerProvider zOffset={200}>
        <Card as={Layer as any} padding={3} shadow={5} style={{top: -51, left: 35}}>
          <Stack space={3}>
            <LayerDebugInfo />
            <Layer>
              <Card padding={3} shadow={1}>
                <Stack space={3}>
                  <LayerDebugInfo />
                  <Layer>
                    <Card padding={3} shadow={1}>
                      <LayerDebugInfo />
                    </Card>
                  </Layer>
                </Stack>
              </Card>
            </Layer>
          </Stack>
        </Card>
      </LayerProvider>
    </Stack>
  )
}
