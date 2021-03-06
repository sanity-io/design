import {Card, Container, Flex, Spinner} from '@sanity/ui'
import React, {useRef} from 'react'
import styled from 'styled-components'
import {useWorkshop} from '../useWorkshop'

const Iframe = styled.iframe`
  &:not([hidden]) {
    display: block;
  }
  border: 0;
  height: 100%;
  width: 100%;
`

export function WorkshopStoryCanvas(props: {
  frameRef: React.Ref<HTMLIFrameElement>
  ready: boolean
  scheme: 'light' | 'dark'
  viewport: number | 'auto'
}): React.ReactElement {
  const {frameRef, ready, scheme, viewport} = props
  const {frameUrl, location, scope, story} = useWorkshop()
  const initialFrameUrl = useRef(`${frameUrl}?path=${location.path}&scheme=${scheme}`)

  return (
    <Flex direction="column" flex={3} overflow="hidden">
      <Card flex={1} padding={[2, 2, 3, 4]} tone="transparent">
        <Container
          height="fill"
          hidden={!scope || !story}
          style={{maxWidth: viewport === 'auto' ? 'none' : `${viewport}px`}}
          width="auto"
        >
          <Card
            height="fill"
            overflow="hidden"
            shadow={ready ? 1 : undefined}
            tone={ready ? undefined : 'inherit'}
          >
            {!ready && (
              <Flex align="center" height="fill" justify="center">
                <Spinner muted />
              </Flex>
            )}

            <Iframe hidden={!ready} ref={frameRef} src={initialFrameUrl.current} />
          </Card>
        </Container>
      </Card>
    </Flex>
  )
}
