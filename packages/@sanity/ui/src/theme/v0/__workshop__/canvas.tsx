import {Box, Flex, Grid, Stack, Text} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React, {createContext, useContext} from 'react'
import {
  ThemeColorModeOptions,
  ThemeColorModeToneOptions,
  ThemeColorPaletteOptions,
  ThemeColorSchemeOptions,
  ThemeColorStateOptions,
  ThemeColorStatesOptions,
  ThemeColorToneOptions,
} from '../../v1/theme'
import {useTheme} from '../../v1/useTheme'

interface Features {
  light: boolean
  dark: boolean

  base: boolean
  button: boolean
  card: boolean
  input: boolean
  muted: boolean
  selectable: boolean
  solid: boolean
  spot: boolean
}

const defaultFeatures: Features = {
  light: true,
  dark: false,

  base: false,
  button: false,
  card: false,
  input: false,
  muted: true,
  selectable: false,
  solid: false,
  spot: false,
}

const FeaturesContext = createContext<Features>(defaultFeatures)

function useFeatures() {
  return useContext(FeaturesContext)
}

export default function CanvasStory() {
  const theme = useTheme()

  const features: Features = {
    ...defaultFeatures,
    light: useBoolean('Light', defaultFeatures.light, 'Props') ?? defaultFeatures.light,
    dark: useBoolean('Dark', defaultFeatures.dark, 'Props') ?? defaultFeatures.dark,
    base: useBoolean('Base', defaultFeatures.base, 'Props') ?? defaultFeatures.base,
    button: useBoolean('Button', defaultFeatures.button, 'Props') ?? defaultFeatures.button,
    card: useBoolean('Card', defaultFeatures.card, 'Props') ?? defaultFeatures.card,
    input: useBoolean('Input', defaultFeatures.input, 'Props') ?? defaultFeatures.input,
    muted: useBoolean('Muted', defaultFeatures.muted, 'Props') ?? defaultFeatures.muted,
    selectable:
      useBoolean('Selectable', defaultFeatures.selectable, 'Props') ?? defaultFeatures.selectable,
    solid: useBoolean('Solid', defaultFeatures.solid, 'Props') ?? defaultFeatures.solid,
    spot: useBoolean('Spot', defaultFeatures.spot, 'Props') ?? defaultFeatures.spot,
  }

  return (
    <FeaturesContext.Provider value={features}>
      <Flex>
        {features.light && <ColorScheme scheme={theme.color._options.scheme.light} />}
        {features.dark && <ColorScheme scheme={theme.color._options.scheme.dark} />}
      </Flex>
    </FeaturesContext.Provider>
  )
}

function ColorScheme(props: {scheme: ThemeColorSchemeOptions}) {
  const {scheme} = props

  if (!scheme) return null

  return (
    <Flex direction="column" flex={1}>
      <ColorPalette palette={scheme.default} />
      <ColorPalette palette={scheme.brand} />
      <ColorPalette palette={scheme.accent} />
    </Flex>
  )
}

function ColorPalette(props: {palette: ThemeColorPaletteOptions}) {
  const {palette} = props

  return (
    <Flex direction="column" flex={1}>
      <ColorTone tone={palette.default} />
      <ColorTone tone={palette.primary} />
      <ColorTone tone={palette.positive} />
      <ColorTone tone={palette.caution} />
      <ColorTone tone={palette.critical} />
    </Flex>
  )
}

function ColorTone(props: {tone: ThemeColorToneOptions}) {
  const {tone} = props

  return (
    <Flex direction="column" flex={1}>
      <ColorMode mode={tone.default} />
      <ColorMode mode={tone.muted} />
      <ColorMode mode={tone.solid} />
    </Flex>
  )
}

function ColorMode(props: {mode: ThemeColorModeOptions}) {
  const {mode} = props
  const features = useFeatures()

  const {input, states} = mode.tones.default

  return (
    <Box padding={[3, 4]} style={{backgroundColor: states.enabled.bg}}>
      <Stack space={[3, 4]}>
        {features.base && (
          <Stack
            padding={3}
            space={2}
            style={{
              borderRadius: 3,
              boxShadow: `inset 0 0 0 1px ${states.enabled.border}`,
            }}
          >
            <Text>Text</Text>
            <Text muted>Muted</Text>
            <Text accent>Accent</Text>
            <Text>
              <a href="#">Link</a>
            </Text>
            <Text>
              <code>Code</code>
            </Text>
            <div
              style={{
                height: 9,
                background: `linear-gradient(to right, ${states.enabled.skeleton.from}, ${states.enabled.skeleton.to})`,
              }}
            />
          </Stack>
        )}

        {features.button && <ColorButton mode={mode} />}

        {features.input && (
          <Box padding={2} style={{backgroundColor: input.valid.enabled.bg}}>
            <Text style={{color: 'inherit'}}>Input</Text>
          </Box>
        )}

        {features.spot && (
          <Flex gap={1}>
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.blue, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.purple, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.magenta, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.red, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.yellow, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.green, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.cyan, width: 25, height: 25}}
            />
            <Box
              flex={1}
              style={{backgroundColor: states.enabled.spot.gray, width: 25, height: 25}}
            />
          </Flex>
        )}
      </Stack>
    </Box>
  )
}

function ColorButton(props: {mode: ThemeColorModeOptions}) {
  const {mode} = props

  return (
    <Stack space={1}>
      <Grid columns={5} marginBottom={1} gap={1}>
        <Box>
          <Text align="center" muted size={1}>
            Enabled
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Hovered
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Pressed
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Selected
          </Text>
        </Box>
        <Box>
          <Text align="center" muted size={1}>
            Disabled
          </Text>
        </Box>
      </Grid>

      <ColorGenericStates modeTone={mode.tones.default} />
      <ColorGenericStates modeTone={mode.tones.primary} />
      <ColorGenericStates modeTone={mode.tones.positive} />
      <ColorGenericStates modeTone={mode.tones.caution} />
      <ColorGenericStates modeTone={mode.tones.critical} />
    </Stack>
  )
}

function ColorGenericStates(props: {modeTone: ThemeColorModeToneOptions}) {
  const {modeTone} = props

  if (!modeTone) {
    return <div>missing tone</div>
  }

  const {states} = modeTone

  return (
    <Grid columns={5} gap={1}>
      <ColorGenericState color={states.enabled} />
      <ColorGenericState color={states.hovered} />
      <ColorGenericState color={states.pressed} />
      <ColorGenericState color={states.selected} />
      <ColorGenericState color={states.disabled} />
    </Grid>
  )
}

function ColorGenericState(props: {color?: ThemeColorStateOptions}) {
  const {color} = props

  return (
    <Stack
      padding={2}
      space={2}
      style={{
        backgroundColor: color?.bg,
        color: color?.fg,
        border: `1px solid ${color?.border}`,
        borderRadius: 3,
      }}
    >
      <Flex style={{border: `1px solid ${color?.border}`}}>
        <Box flex={1} padding={3} style={{backgroundColor: color?.bg}}>
          <Text align="center" size={1} style={{color: 'inherit'}}>
            bg
          </Text>
        </Box>
        <Box flex={1} padding={3} style={{backgroundColor: color?.bg2}}>
          <Text align="center" size={1} style={{color: 'inherit'}}>
            bg2
          </Text>
        </Box>
      </Flex>

      <Text align="center" style={{color: 'inherit'}}>
        Text
      </Text>
      <Text align="center" size={1} style={{color: color?.link.fg}}>
        Link
      </Text>
      <Text align="center" size={1} style={{color: color?.code.fg}}>
        <span style={{backgroundColor: color?.code.bg}}>Code</span>
      </Text>
      <div
        style={{
          height: 9,
          background: `linear-gradient(to right, ${color?.skeleton?.from}, ${color?.skeleton?.to})`,
        }}
      />
    </Stack>
  )
}
