import {black, hues, white} from '@sanity/color'
import {createColorTheme} from '../colorTheme'
import {createTheme} from '../theme'

export const theme = createTheme({
  // @todo: border: {},

  color: createColorTheme({
    palette: {
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

  font: {
    heading: {
      //
    },
  },

  space: [0, 4, 8, 12, 20, 32, 52, 84, 136, 220],
})
