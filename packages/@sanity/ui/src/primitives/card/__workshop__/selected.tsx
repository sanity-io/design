import {EditIcon, PublishIcon} from '@sanity/icons'
import {useBoolean} from '@sanity/ui-workshop'
import styled, {css} from 'styled-components'
import {Theme, ThemeColorToneKey, useRootTheme} from '../../../theme'
import {Box} from '../../box'
import {Container} from '../../container'
import {Flex} from '../../flex'
import {Inline} from '../../inline'
import {Stack} from '../../stack'
import {Text} from '../../text'
import {Card} from '../card'

const TextWithTone = styled(Text)<{$tone: ThemeColorToneKey}>(
  ({$tone, theme}: {$tone: ThemeColorToneKey; theme: Theme}) => {
    const tone = theme.sanity.color.solid[$tone]

    return css`
      &:not([data-selected]) {
        --card-fg-color: ${tone ? tone.enabled.bg : undefined};
        --card-muted-fg-color: ${tone ? tone.enabled.bg : undefined};
      }

      [data-ui='Card']:disabled & {
        --card-fg-color: inherit;
        --card-muted-fg-color: inherit;
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
  const theme = useRootTheme()

  return (
    <Flex>
      <Box flex={1}>
        <Text>Title</Text>
      </Box>
      <Inline space={3}>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={theme.tone === 'default' ? 'caution' : 'default'}
        >
          <EditIcon />
        </TextWithTone>
        <TextWithTone
          data-selected={selected ? '' : undefined}
          muted
          $tone={theme.tone === 'default' ? 'positive' : 'default'}
        >
          <PublishIcon />
        </TextWithTone>
      </Inline>
    </Flex>
  )
}
