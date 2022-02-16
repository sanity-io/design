export interface ThemeColorState {
  border: string
  bg: string
  fg: string
}

export interface ThemeColorToneOptions {
  [mode: string]: {
    enabled: ThemeColorState
  }
}

export interface ThemeColorPaletteOptions {
  [tone: string]: ThemeColorToneOptions
}

export interface ThemeColorSchemeOptions {
  [palette: string]: ThemeColorPaletteOptions
}

export interface ThemeColorOptions {
  defaultMode?: string
  defaultPalette?: string
  defaultScheme?: string
  defaultTone?: string
  scheme: {[scheme: string]: ThemeColorSchemeOptions}
}

export interface ThemeOptions {
  border?: {
    [style: string]: {
      style: 'solid' | 'dotted' | 'dashed'
      width: number
    }
  }

  color: ThemeColorOptions

  font?: {
    heading: {
      //
    }
  }

  space?: number[]
}

export interface ThemeColor {
  mode?: string
  palette?: string
  scheme?: string
  tone?: string
  state: (
    state: 'enabled',
    opts?: {
      palette?: string
      tone?: string
      mode?: string
    }
  ) => ThemeColorState
}

export interface ThemeV1 {
  color: ThemeColor
}

export function createTheme(options: ThemeOptions): ThemeV1 {
  const {
    defaultMode: mode = 'default',
    defaultPalette: palette = 'default',
    defaultScheme: scheme = 'light',
    defaultTone: tone = 'default',
  } = options.color

  const color: ThemeColor = {
    mode,
    palette,
    scheme,
    tone,
    state(state, opts): ThemeColorState {
      const _scheme = options.color.scheme[scheme]
      const _palette = _scheme[opts?.palette || palette] || _scheme[palette]
      const _tone = _palette[opts?.tone || 'default'] || _palette.default
      const _mode = _tone[opts?.mode || 'default'] || _tone.default

      return _mode[state]
    },
  }

  return {
    color,
  }
}
