import {mix} from 'color2k'
import {multiply, screen} from '../v0/studioTheme/helpers'
import {
  ThemeColorModeOptions,
  ThemeColorModeToneOptions,
  ThemeColorOptions,
  ThemeColorPaletteOptions,
  ThemeColorToneOptions,
} from './theme'

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
  palettes: {
    default: TODO_PaletteOptions
    brand: TODO_PaletteOptions
    accent: TODO_PaletteOptions
  }

  tones: TODO_TonesOptions
}

export function createColorTheme(context: TODO_FindAGoodName): ThemeColorOptions {
  const {palettes, tones} = context

  return {
    // defaultPalette: 'brand',
    defaultScheme: 'light',

    scheme: {
      // scheme=light
      light: {
        default: createColorPalette({palette: palettes.default, tones}),
        brand: createColorPalette({palette: palettes.brand, tones}),
        accent: createColorPalette({palette: palettes.accent, tones}),
      },

      // @todo: scheme=dark
      // dark: {
      //   default: createColorPalette(options.palette.default, options.tones),
      //   brand: createColorPalette(options.palette.brand, options.tones),
      // },
    },
  }
}

function createColorPalette(context: {
  palette: TODO_PaletteOptions
  tones: TODO_TonesOptions
}): ThemeColorPaletteOptions {
  const {palette, tones} = context

  return {
    default: createColorTone({palette, tones, tone: tones.default}),
    primary: createColorTone({palette, tones, tone: tones.primary}),
    positive: createColorTone({palette, tones, tone: tones.positive}),
    caution: createColorTone({palette, tones, tone: tones.caution}),
    critical: createColorTone({palette, tones, tone: tones.critical}),
  }
}

function createColorTone(context: {
  palette: TODO_PaletteOptions
  tones: TODO_TonesOptions
  tone: TODO_ToneOptions
}): ThemeColorToneOptions {
  const {palette, tone, tones} = context

  const base = tone.base || palette.base
  const bg = tone.light?.bg || mix(palette.light.bg, base, 0.1)
  const fg = tone.light?.fg || mix(palette.light.fg, base, 0.2)

  return {
    // mode=default
    default: createColorDefaultMode({bg, fg, palette, tones}),
    // mode=muted
    muted: createColorMutedMode({bg, fg, base, palette, tones}),
    // mode=solid
    solid: createColorSolidMode({bg, fg, base, palette, tones}),
  }
}

function createColorDefaultMode(context: {
  bg: string
  fg: string
  palette: TODO_PaletteOptions
  tones: TODO_TonesOptions
}): ThemeColorModeOptions {
  const {bg, fg, palette, tones} = context

  const color = {
    bg: multiply(palette.light.bg, bg),
    bg2: multiply(palette.light.bg, bg), // @todo
    fg: multiply(palette.light.fg, fg),
  }

  return {
    tones: {
      default: {
        states: {
          // state=enabled
          enabled: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {
              fg: mix(color.bg, tones.primary.light?.fg || color.fg, 0.7), // '#000',
            },
            code: {
              bg: mix(color.bg, color.fg, 0.1),
              fg: mix(color.bg, color.fg, 0.7),
            },
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=disabled
          disabled: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=hovered
          hovered: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=pressed
          pressed: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=selected
          selected: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
        },
        focusRing: '#000',
        input: {
          valid: {
            enabled: {},
            disabled: {},
            hovered: {},
            readOnly: {},
          } as any,
          invalid: {
            enabled: {},
            disabled: {},
            hovered: {},
            readOnly: {},
          } as any,
        },
        shadow: {outline: '#000', umbra: '#000', penumbra: '#000', ambient: '#000'},
      },
    },
  }
}

function createColorMutedMode(context: {
  base: string
  bg: string
  fg: string
  palette: TODO_PaletteOptions
  tones: TODO_TonesOptions
}): ThemeColorModeOptions {
  const {palette, tones} = context

  const color = {
    bg: multiply(palette.light.bg, mix(context.bg, context.base, 0.1)),
    bg2: multiply(palette.light.bg, mix(context.bg, context.base, 0.15)), // @todo
    fg: multiply(palette.light.bg, mix(context.fg, context.base, 0.8)),
  }

  return {
    tones: {
      default: {
        states: {
          // state=enabled
          enabled: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {
              bg: mix(color.bg, color.fg, 0.1),
              fg: mix(color.bg, color.fg, 0.8),
              // bg: '#000',
              // fg: '#000',
            },
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=disabled
          disabled: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=hovered
          hovered: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=pressed
          pressed: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
          // state=selected
          selected: {
            ...color,
            border: mix(color.bg, color.fg, 0.2),
            link: {fg: '#000'},
            code: {bg: '#000', fg: '#000'},
            skeleton: {
              from: '#000',
              to: '#000',
            },
            spot: {gray: '#000'} as any,
            syntax: {} as any,
          },
        },
        focusRing: '#000',
        input: {
          valid: {
            enabled: {},
            disabled: {},
            hovered: {},
            readOnly: {},
          } as any,
          invalid: {
            enabled: {},
            disabled: {},
            hovered: {},
            readOnly: {},
          } as any,
        },
        shadow: {outline: '#000', umbra: '#000', penumbra: '#000', ambient: '#000'},
      },
    },
  }
}

function createColorSolidMode(context: {
  bg: string
  fg: string
  base: string
  palette: TODO_PaletteOptions
  tones: TODO_TonesOptions
}): ThemeColorModeOptions {
  const base = context.palette.base || context.base

  const bg = {
    default: multiply(context.bg, context.tones.default.base || base),
    primary: multiply(context.bg, context.tones.primary.base || base),
    positive: multiply(context.bg, context.tones.positive.base || base),
    caution: multiply(context.bg, context.tones.caution.base || base),
    critical: multiply(context.bg, context.tones.critical.base || base),
  }

  const tones = {
    default: {bg: bg.default, fg: mix(bg.default, context.bg, 1)},
    primary: {bg: bg.primary, fg: mix(bg.primary, context.bg, 1)},
    positive: {bg: bg.positive, fg: mix(bg.positive, context.bg, 1)},
    caution: {bg: bg.caution, fg: mix(bg.caution, context.bg, 1)},
    critical: {bg: bg.critical, fg: mix(bg.critical, context.bg, 1)},
  }

  return {
    tones: {
      default: createColorSolidModeTone({bg: tones.default.bg, fg: tones.default.fg}),
      primary: createColorSolidModeTone({bg: tones.primary.bg, fg: tones.primary.fg}),
      positive: createColorSolidModeTone({bg: tones.positive.bg, fg: tones.positive.fg}),
      caution: createColorSolidModeTone({bg: tones.caution.bg, fg: tones.caution.fg}),
      critical: createColorSolidModeTone({bg: tones.critical.bg, fg: tones.critical.fg}),
    },
  }
}

function createColorSolidModeTone(context: {fg: string; bg: string}): ThemeColorModeToneOptions {
  return {
    states: {
      // state=enabled
      enabled: {
        ...context,
        bg2: mix(context.bg, context.fg, 0.05),
        border: mix(context.bg, context.fg, 0.1),
        link: {fg: '#000'},
        code: {
          bg: mix(context.bg, context.fg, 0.1),
          fg: mix(context.bg, context.fg, 0.9),
        },
        skeleton: {
          from: '#000',
          to: '#000',
        },
        spot: {gray: '#000'} as any,
        syntax: {} as any,
      },
      // state=disabled
      disabled: {
        ...context,
        bg2: mix(context.bg, context.fg, 0.025),
        border: mix(context.bg, context.fg, 0.05),
        link: {fg: '#000'},
        code: {bg: '#000', fg: '#000'},
        skeleton: {
          from: '#000',
          to: '#000',
        },
        spot: {gray: '#000'} as any,
        syntax: {} as any,
      },
      // state=hovered
      hovered: {
        ...context,
        bg: mix(context.bg, context.fg, 0.1),
        bg2: mix(context.bg, context.fg, 0.15),
        border: mix(context.bg, context.fg, 0.2),
        link: {fg: '#000'},
        code: {bg: '#000', fg: '#000'},
        skeleton: {
          from: '#000',
          to: '#000',
        },
        spot: {gray: '#000'} as any,
        syntax: {} as any,
      },
      // state=pressed
      pressed: {
        ...context,
        bg2: mix(context.bg, context.fg, 0.05),
        border: mix(context.bg, context.fg, 0.1),
        link: {fg: '#000'},
        code: {bg: '#000', fg: '#000'},
        skeleton: {
          from: '#000',
          to: '#000',
        },
        spot: {gray: '#000'} as any,
        syntax: {} as any,
      },
      // state=selected
      selected: {
        ...context,
        bg2: mix(context.bg, context.fg, 0.05),
        border: mix(context.bg, context.fg, 0.1),
        link: {fg: '#000'},
        code: {bg: '#000', fg: '#000'},
        skeleton: {
          from: '#000',
          to: '#000',
        },
        spot: {gray: '#000'} as any,
        syntax: {} as any,
      },
    },
    focusRing: '#000',
    input: {
      valid: {
        enabled: {},
        disabled: {},
        hovered: {},
        readOnly: {},
      } as any,
      invalid: {
        enabled: {},
        disabled: {},
        hovered: {},
        readOnly: {},
      } as any,
    },
    shadow: {outline: '#000', umbra: '#000', penumbra: '#000', ambient: '#000'},
  }
}
