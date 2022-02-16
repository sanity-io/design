import {mix} from 'color2k'
import {multiply} from '../theme/studioTheme/helpers'
import {ThemeColorOptions, ThemeColorPaletteOptions, ThemeColorToneOptions} from './theme'

interface TODO_PaletteOptions {
  base: string
  light: {bg: string; fg: string}
  dark: {bg: string; fg: string}
}

interface TODO_ToneOptions {
  base?: string // color string (either hex, rgba or hsla)
  light?: {bg: string; fg: string}
  dark?: {bg: string; fg: string}
}

interface TODO_TonesOptions {
  default: TODO_ToneOptions
  primary: TODO_ToneOptions
  positive: TODO_ToneOptions
  caution: TODO_ToneOptions
  critical: TODO_ToneOptions
}

interface TODO_FindAGoodName {
  palette: {
    default: TODO_PaletteOptions
    brand: TODO_PaletteOptions
    accent: TODO_PaletteOptions
  }

  tones: TODO_TonesOptions
}

export function createColorTheme(options: TODO_FindAGoodName): ThemeColorOptions {
  return {
    // defaultPalette: 'brand',
    defaultScheme: 'light',

    scheme: {
      // scheme=light
      light: {
        default: createColorPalette(options.palette.default, options.tones),
        brand: createColorPalette(options.palette.brand, options.tones),
        accent: createColorPalette(options.palette.accent, options.tones),
      },

      // @todo: scheme=dark
      // dark: {
      //   default: createColorPalette(options.palette.default, options.tones),
      //   brand: createColorPalette(options.palette.brand, options.tones),
      // },
    },
  }
}

function createColorPalette(
  palette: TODO_PaletteOptions,
  tones: TODO_TonesOptions
): ThemeColorPaletteOptions {
  return {
    default: createColorTone(palette, tones.default),
    primary: createColorTone(palette, tones.primary),
    positive: createColorTone(palette, tones.positive),
    caution: createColorTone(palette, tones.caution),
    critical: createColorTone(palette, tones.critical),
  }
}

function createColorTone(
  palette: TODO_PaletteOptions,
  tone: TODO_ToneOptions
): ThemeColorToneOptions {
  const base = tone.base || palette.base
  const bg = tone.light?.bg || mix(palette.light.bg, base, 0.1)
  const fg = tone.light?.fg || mix(palette.light.fg, base, 0.2)

  const modes = {
    default: {
      bg: multiply(palette.light.bg, bg),
      fg: multiply(palette.light.fg, fg),
    },

    muted: {
      bg: multiply(palette.light.bg, mix(bg, base, 0.15)),
      fg: multiply(palette.light.bg, mix(fg, base, 0.8)),
    },

    solid: {
      bg: multiply(palette.light.bg, mix(fg, base, 1)),
      fg: multiply(palette.light.bg, mix(bg, base, 0)),
    },
  }

  return {
    // mode=default
    default: {
      // state=enabled
      enabled: {
        ...modes.default,
        border: mix(modes.default.bg, modes.default.fg, 0.2),
      },
    },
    // mode=muted
    muted: {
      // state=enabled
      enabled: {
        ...modes.muted,
        border: mix(modes.muted.bg, modes.muted.fg, 0.2),
      },
    },
    solid: {
      // state=enabled
      enabled: {
        ...modes.solid,
        border: mix(modes.solid.bg, fg, 0.1),
      },
    },
  }
}
