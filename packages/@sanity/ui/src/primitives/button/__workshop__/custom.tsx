import React from 'react'
import {WORKSHOP_BUTTON_TONE_OPTIONS} from '../../../__workshop__/constants'
import {Flex} from '../../flex'
import {Grid} from '../../grid'
import {Stack} from '../../stack'
import {Text} from '../../text'
import {Button} from '../button'

export default function CustomStory() {
  const tones = Object.entries(WORKSHOP_BUTTON_TONE_OPTIONS)

  return (
    <Flex align="center" height="fill" justify="center">
      <Stack space={2}>
        <Grid columns={5} gap={1}>
          {tones.map(([title, tone]) => (
            <Button key={tone} mode="ghost" padding={3} tone={tone}>
              <Stack space={2}>
                <Text>{title}</Text>
                <Text muted>Muted</Text>
                <Text muted>
                  <a href="#">Link</a>
                </Text>
                <Text>
                  <code>Code</code>
                </Text>
                <Text accent>Accent</Text>
              </Stack>
            </Button>
          ))}
        </Grid>
        <Grid columns={5} gap={1}>
          {tones.map(([title, tone]) => (
            <Button key={tone} mode="default" padding={3} tone={tone}>
              <Stack space={2}>
                <Text>{title}</Text>
                <Text muted>Muted</Text>
                <Text muted>
                  <a href="#">Link</a>
                </Text>
                <Text>
                  <code>Code</code>
                </Text>
                <Text accent>Accent</Text>
              </Stack>
            </Button>
          ))}
        </Grid>
      </Stack>
    </Flex>
  )
}
