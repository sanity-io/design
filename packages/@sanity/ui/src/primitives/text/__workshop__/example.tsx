import {Card, Container, Flex, Text} from '@sanity/ui'
import {useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React from 'react'
import styled from 'styled-components'
import {
  WORKSHOP_TEXT_ALIGN_OPTIONS,
  WORKSHOP_TEXT_OVERFLOW_OPTIONS,
  WORKSHOP_TEXT_SIZE_OPTIONS,
  WORKSHOP_TEXT_WEIGHT_OPTIONS,
} from '../../../__workshop__/constants'

const Debuggable = styled.div<{$debug?: boolean}>`
  box-shadow: ${(props) =>
    props.$debug ? '0 1px 0 0 rgba(0 0 255 / 0.5), 0 -1px 0 0 rgba(255 0 0 / 0.5)' : undefined};
`

export default function TextStory() {
  const $debug = useBoolean('Debug', false, 'Props')
  const accent = useBoolean('Accent', false, 'Props')
  const align = useSelect('Align', WORKSHOP_TEXT_ALIGN_OPTIONS, '', 'Props') || undefined
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props')
  const text = useText('Text', 'Hamburgefonstiv', 'Props')

  const textOverflow =
    useSelect('Text overflow', WORKSHOP_TEXT_OVERFLOW_OPTIONS, undefined, 'Props') || undefined

  const weight = useSelect('Weight', WORKSHOP_TEXT_WEIGHT_OPTIONS, '', 'Props') || undefined

  return (
    <Card height="fill" padding={4} sizing="border">
      <Flex align="center" height="fill" justify="center">
        <Container width={0}>
          <Debuggable $debug={$debug}>
            <Text
              accent={accent}
              align={align}
              muted={muted}
              size={size}
              textOverflow={textOverflow}
              weight={weight}
            >
              {text}
            </Text>
          </Debuggable>
        </Container>
      </Flex>
    </Card>
  )
}
