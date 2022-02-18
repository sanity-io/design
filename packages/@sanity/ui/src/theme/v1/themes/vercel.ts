import {fonts} from '../../v0/studioTheme/fonts'
import {createColorTheme} from '../colorTheme'
import {createTheme} from '../theme'

const color = {
  geist: {
    bg: '#FFF',
    fg: '#000',
  },
  accent1: '#FAFAFA',
  accent2: '#EAEAEA',
  accent3: '#999',
  accent4: '#888',
  accent5: '#666',
  accent6: '#444',
  accent7: '#333',
  accent8: '#111',

  error: {
    lighter: '#F7D4D6',
    light: '#FF1A1A',
    default: '#E00',
    dark: '#C50000',
  },

  success: {
    lighter: '#D3E5FF',
    light: '#3291FF',
    default: '#0070F3',
    dark: '#0761D1',
  },

  warning: {
    lighter: '#FFEFCF',
    light: '#F7B955',
    default: '#F5A623',
    dark: '#AB570A',
  },

  violet: {
    lighter: '#D8CCF1',
    light: '#8A63D2',
    default: '#7928CA',
    dark: '#4C2889',
  },

  cyan: {
    lighter: '#AAFFEC',
    light: '#79FFE1',
    default: '#50E3C2',
    dark: '#29BC9B',
  },

  highlight: {
    purple: '#F81CE5',
    magenta: '#EB367F',
    pink: '#FF0080',
    yellow: '#FFF500',
  },
}

export const theme = createTheme({
  // @todo: border: {},

  color: createColorTheme({
    palettes: {
      default: {
        base: color.accent4,
        light: {
          bg: color.geist.bg,
          fg: color.geist.fg,
        },
        dark: {
          bg: color.geist.fg,
          fg: color.geist.bg,
        },
      },
      brand: {
        base: color.accent4,
        light: {
          bg: color.geist.bg,
          fg: color.geist.fg,
        },
        dark: {
          bg: color.geist.fg,
          fg: color.geist.bg,
        },
      },
      accent: {
        base: color.violet.default,
        light: {
          bg: color.violet.lighter,
          fg: color.violet.dark,
        },
        dark: {
          bg: color.violet.dark,
          fg: color.violet.lighter,
        },
      },
    },

    tones: {
      default: {
        base: color.geist.fg,
        light: {
          bg: color.geist.bg,
          fg: color.geist.fg,
        },
        dark: {
          bg: color.geist.fg,
          fg: color.geist.bg,
        },
      },
      primary: {
        base: color.highlight.magenta,
      },
      positive: {
        base: color.success.default,
      },
      caution: {
        base: color.warning.default,
      },
      critical: {
        base: color.error.default,
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
