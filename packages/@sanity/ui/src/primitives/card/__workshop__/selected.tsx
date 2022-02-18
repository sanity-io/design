import {EditIcon, PublishIcon} from '@sanity/icons'
import {
  Box,
  Card,
  Container,
  Flex,
  Inline,
  Stack,
  Text,
  // Theme,
  ThemeColorToneKey,
  // useRootTheme,
} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React from 'react'
import styled, {css} from 'styled-components'
import {ThemeProps} from '../../../styles'
import {useTheme} from '../../../theme'

const TextWithTone = styled(Text)<{$tone: ThemeColorToneKey}>(
  ({$tone, theme}: {$tone: ThemeColorToneKey} & ThemeProps) => {
    const tone = theme.sanity.color.solid[$tone]

    return css`
      &:not([data-selected]) {
        --sanity-fg-color: ${tone ? tone.enabled.bg : undefined};
        --sanity-muted-fg-color: ${tone ? tone.enabled.bg : undefined};
      }

      [data-ui='Card']:disabled & {
        --sanity-fg-color: inherit;
        --sanity-muted-fg-color: inherit;
      }
    `
  }
)

export default function SelectedStory() {
  const disabled = useBoolean('Disabled', false) || false
  const selected = useBoolean('Selected', false) || false

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container width={0}>
        <Stack space={1}>
          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
          >
            <Preview selected={selected} />
          </Card>

          <Card
            __unstable_focusRing
            as="button"
            disabled={disabled}
            padding={3}
            radius={2}
            selected={selected}
            tone="critical"
          >
            <Preview selected={selected} />
          </Card>
        </Stack>
      </Container>
    </Flex>
  )
}

function Preview({selected}: {selected: boolean}) {
  const theme = useTheme()

  return (
    <Flex>
      <Box flex={1}>
        <Text>Title</Text>
      </Box>
      <Inline space={3}>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={theme.color.config.tone === 'default' ? 'caution' : 'default'}
        >
          <EditIcon />
        </TextWithTone>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={theme.color.config.tone === 'default' ? 'positive' : 'default'}
        >
          <PublishIcon />
        </TextWithTone>
      </Inline>
    </Flex>
  )
}
