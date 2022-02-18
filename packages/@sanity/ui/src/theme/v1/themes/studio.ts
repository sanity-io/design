import {black, hues, white} from '@sanity/color'
import {fonts} from '../../v0/studioTheme/fonts'
import {createColorTheme} from '../colorTheme'
import {createTheme} from '../theme'

export const theme = createTheme({
  // @todo: border: {},

  color: createColorTheme({
    palettes: {
      default: {
        base: hues.gray[500].hex,
        light: {
          bg: white.hex,
          fg: black.hex,
        },
        dark: {
          bg: black.hex,
          fg: white.hex,
        },
      },
      brand: {
        base: hues.blue[500].hex,
        light: {
          bg: hues.blue[100].hex,
          fg: hues.blue[900].hex,
        },
        dark: {
          bg: hues.blue[900].hex,
          fg: hues.blue[100].hex,
        },
      },
      accent: {
        base: hues.purple[500].hex,
        light: {
          bg: hues.purple[100].hex,
          fg: hues.purple[900].hex,
        },
        dark: {
          bg: hues.purple[900].hex,
          fg: hues.purple[100].hex,
        },
      },
    },

    tones: {
      default: {
        // base: hues.gray[500].hex,
        light: {
          bg: white.hex,
          fg: black.hex,
        },
        dark: {
          bg: black.hex,
          fg: white.hex,
        },
      },
      primary: {
        base: hues.blue[500].hex,
      },
      positive: {
        base: hues.green[500].hex,
      },
      caution: {
        base: hues.yellow[500].hex,
      },
      critical: {
        base: hues.red[500].hex,
      },
    },
  }),

  avatar: {
    sizes: [
      {distance: -3, size: 25},
      {distance: -6, size: 35},
      {distance: -9, size: 55},
    ],
  },
  button: {
    textWeight: 'medium',
  },
  container: [320, 640, 960, 1280, 1600, 1920],
  focusRing: {
    offset: 1,
    width: 2,
  },
  fonts,
  media: [360, 600, 900, 1200, 1800, 2400],
  radius: [0, 1, 3, 6, 9, 12, 21],
  shadows: [
    null,
    {umbra: [0, 0, 0, 0], penumbra: [0, 0, 0, 0], ambient: [0, 0, 0, 0]},
    {umbra: [0, 3, 5, -1], penumbra: [0, 6, 10, 0], ambient: [0, 1, 18, 0]},
    {umbra: [0, 7, 8, -4], penumbra: [0, 12, 17, 2], ambient: [0, 5, 22, 4]},
    {umbra: [0, 9, 11, -5], penumbra: [0, 18, 28, 2], ambient: [0, 7, 34, 6]},
    {umbra: [0, 11, 15, -7], penumbra: [0, 24, 38, 3], ambient: [0, 9, 46, 8]},
  ],
  space: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220],
  input: {
    checkbox: {
      size: 17,
    },
    radio: {
      size: 17,
      markSize: 9,
    },
    switch: {
      width: 33,
      height: 17,
      padding: 4,
      transitionDurationMs: 150,
      transitionTimingFunction: 'ease-out',
    },
    border: {
      width: 1,
    },
  },
})
