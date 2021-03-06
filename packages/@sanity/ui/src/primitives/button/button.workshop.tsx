import {AddIcon, icons, IconSymbol, UploadIcon} from '@sanity/icons'
import {
  Button,
  ButtonMode,
  ButtonTone,
  Card,
  Container,
  Flex,
  FlexJustify,
  Stack,
  Text,
} from '@sanity/ui'
import {defineScope, useAction, useBoolean, useSelect, useText} from '@sanity/ui-workshop'
import React, {useCallback, useRef} from 'react'
import styled from 'styled-components'

export default defineScope('primitives/button', 'Button', [
  {name: 'props', title: 'Props', component: ButtonStory},
  {name: 'styled-1', title: 'Styled #1', component: StyledButton1Story},
  {name: 'styled-2', title: 'Styled #2', component: StyledButton2Story},
  {name: 'stacked', title: 'Stacked', component: StackedStory},
  {name: 'custom', title: 'Custom', component: CustomStory},
  {name: 'mixed-children', title: 'Mixed children', component: MixedChildrenStory},
  {name: 'upload-button', title: 'Upload button', component: UploadButtonStory},
  {
    name: 'sanity-upload-button-workaround',
    title: 'SanityUploadButtonWorkaroundStory',
    component: SanityUploadButtonWorkaroundStory,
  },
])

const BUTTON_MODE_OPTIONS: {[key: string]: ButtonMode} = {
  Default: 'default',
  Ghost: 'ghost',
  Bleed: 'bleed',
}

const BUTTON_TONE_OPTIONS: {[key: string]: ButtonTone} = {
  Default: 'default',
  Primary: 'primary',
  Positive: 'positive',
  Caution: 'caution',
  Critical: 'critical',
}

const FLEX_JUSTIFY_OPTIONS: FlexJustify[] = [
  'flex-start',
  'flex-end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
]

const TEXT_SIZE_OPTIONS = {'0': 0, '1': 1, '2 (default)': 2, '3': 3, '4': 4}

const TEXT_ALIGN_OPTIONS: {[key: string]: 'left' | 'right' | 'center' | ''} = {
  Undefined: '',
  Left: 'left',
  Right: 'right',
  Center: 'center',
}

const SPACE_OPTIONS = {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7}

const ICON_SYMBOL_OPTIONS = Object.keys(icons).reduce(
  (acc: {[key: string]: string}, key) => {
    acc[key] = key

    return acc
  },
  {'(none)': ''}
)

export function ButtonStory(): React.ReactElement {
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', TEXT_SIZE_OPTIONS, 2, 'Props')
  const icon = useSelect('Icon', ICON_SYMBOL_OPTIONS, 'add-circle', 'Props') as IconSymbol
  const iconRight = useSelect('Icon (right)', ICON_SYMBOL_OPTIONS, '', 'Props') as IconSymbol
  const justify = useSelect('Justify', FLEX_JUSTIFY_OPTIONS, 'center', 'Props')
  const mode = useSelect('Mode', BUTTON_MODE_OPTIONS, 'default', 'Props')
  const paddingX = useSelect('Padding X', SPACE_OPTIONS, 3, 'Props')
  const paddingY = useSelect('Padding Y', SPACE_OPTIONS, 3, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const space = useSelect('Space', SPACE_OPTIONS, 3, 'Props')
  const tone = useSelect('Tone', BUTTON_TONE_OPTIONS, 'default', 'Props')
  const textAlign = useSelect('Text align', TEXT_ALIGN_OPTIONS, undefined, 'Props') || undefined
  const textProp = useText('Text', 'Label', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Button
        disabled={disabled}
        fontSize={fontSize}
        icon={icon && icons[icon]}
        iconRight={iconRight && icons[iconRight]}
        justify={justify}
        mode={mode}
        onClick={useAction('onClick')}
        paddingX={paddingX}
        paddingY={paddingY}
        selected={selected}
        space={space}
        textAlign={textAlign}
        text={textProp}
        tone={tone}
      />
    </Flex>
  )
}

const StyledButton1 = styled.a`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

function StyledButton1Story() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button as={StyledButton1} href="#" text="Test" />
    </Flex>
  )
}

const StyledButton2 = styled(Button)`
  &:hover {
    background-color: red;
    box-shadow: none;
  }
`

function StyledButton2Story() {
  const props = {href: '#', text: 'Test'}

  // NOTE: This approach does not work with TypeScript
  return (
    <Flex align="center" height="fill" justify="center">
      <StyledButton2 forwardedAs="a" {...(props as any)} />
    </Flex>
  )
}

function StackedStory() {
  const disabled = useBoolean('Disabled', false, 'Props')
  const fontSize = useSelect('Font size', TEXT_SIZE_OPTIONS, 2, 'Props')
  const icon = useSelect('Icon', ICON_SYMBOL_OPTIONS, 'add-circle', 'Props') as IconSymbol
  const iconRight = useSelect('Icon (right)', ICON_SYMBOL_OPTIONS, '', 'Props') as IconSymbol
  const justify = useSelect('Justify', FLEX_JUSTIFY_OPTIONS, 'center', 'Props')
  const mode = useSelect('Mode', BUTTON_MODE_OPTIONS, 'default', 'Props')
  const paddingX = useSelect('Padding X', SPACE_OPTIONS, 3, 'Props')
  const paddingY = useSelect('Padding Y', SPACE_OPTIONS, 3, 'Props')
  const selected = useBoolean('Selected', false, 'Props')
  const space = useSelect('Space', SPACE_OPTIONS, 3, 'Props')
  const tone = useSelect('Tone', BUTTON_TONE_OPTIONS, 'default', 'Props')
  const textProp = useText('Text', 'Label', 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Container width={0} style={{textAlign: 'center'}}>
        <Card padding={4}>
          <Stack space={1}>
            <Button
              disabled={disabled}
              fontSize={fontSize}
              icon={icon && icons[icon]}
              iconRight={iconRight && icons[iconRight]}
              justify={justify}
              mode={mode}
              onClick={useAction('onClick')}
              paddingX={paddingX}
              paddingY={paddingY}
              selected={selected}
              space={space}
              text={textProp}
              tone={tone}
            />
            <Button
              disabled={disabled}
              fontSize={fontSize}
              icon={icon && icons[icon]}
              iconRight={iconRight && icons[iconRight]}
              justify={justify}
              mode={mode}
              onClick={useAction('onClick')}
              paddingX={paddingX}
              paddingY={paddingY}
              selected={selected}
              space={space}
              text={textProp}
              tone={tone}
            />
          </Stack>
        </Card>
      </Container>
    </Flex>
  )
}

function CustomStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button padding={2}>
        <Text>Custom button</Text>
      </Button>
    </Flex>
  )
}

function MixedChildrenStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Button fontSize={[2, 2, 3]} icon={AddIcon} mode="ghost" padding={[3, 3, 4]} text="Create">
        <span style={{display: 'none'}}>test</span>
      </Button>
    </Flex>
  )
}

function UploadButtonStory() {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      inputRef.current?.click()
    }
  }, [])

  return (
    <Flex align="center" height="fill" htmlFor="file" justify="center">
      <Button
        as="label"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        text={
          <>
            Upload
            <input id="file" ref={inputRef} type="file" style={{display: 'none'}} />
          </>
        }
      />
    </Flex>
  )
}

const SanityUploadButton = styled(Button).attrs({forwardedAs: 'label'})`
  & input {
    -webkit-appearance: none;
    overflow: hidden;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    max-width: 0;
    width: stretch;
  }

  & span:nth-child(2) {
    width: 0;
    flex: none;
    padding: 0;
  }
`

function SanityUploadButtonWorkaroundStory() {
  return (
    <Flex align="center" height="fill" htmlFor="file" justify="center">
      <SanityUploadButton icon={UploadIcon} tabIndex={0} text="Upload">
        <input type="file" />
      </SanityUploadButton>
    </Flex>
  )
}
