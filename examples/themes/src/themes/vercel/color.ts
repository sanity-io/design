import {createColorTheme} from '@sanity/ui'

const palette = {
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

export const color = createColorTheme({
  palettes: {
    default: {
      base: palette.accent4,
      light: {
        bg: palette.geist.bg,
        fg: palette.geist.fg,
      },
      dark: {
        bg: palette.geist.fg,
        fg: palette.geist.bg,
      },
    },
    brand: {
      base: palette.accent4,
      light: {
        bg: palette.geist.bg,
        fg: palette.geist.fg,
      },
      dark: {
        bg: palette.geist.fg,
        fg: palette.geist.bg,
      },
    },
    accent: {
      base: palette.violet.default,
      light: {
        bg: palette.violet.lighter,
        fg: palette.violet.dark,
      },
      dark: {
        bg: palette.violet.dark,
        fg: palette.violet.lighter,
      },
    },
  },

  tones: {
    default: {
      base: palette.geist.fg,
      light: {
        bg: palette.geist.bg,
        fg: palette.geist.fg,
      },
      dark: {
        bg: palette.geist.fg,
        fg: palette.geist.bg,
      },
    },
    primary: {
      base: palette.highlight.magenta,
    },
    positive: {
      base: palette.success.default,
    },
    caution: {
      base: palette.warning.default,
    },
    critical: {
      base: palette.error.default,
    },
  },
})
