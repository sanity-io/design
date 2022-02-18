import {ThemeV0} from '../v0'

export interface ThemeColorStateOptions {
  border: string
  bg: string
  bg2: string
  fg: string
  // muted: {
  //   fg: string
  // }
  // accent: {
  //   fg: string
  // }
  link: {
    fg: string
  }
  code: {
    bg: string
    fg: string
  }
  skeleton: {
    from: string
    to: string
  }
  spot: {
    gray: string
    blue: string
    purple: string
    magenta: string
    red: string
    orange: string
    yellow: string
    green: string
    cyan: string
  }
  syntax: {
    atrule: string
    attrName: string
    attrValue: string
    attribute: string
    boolean: string
    builtin: string
    cdata: string
    char: string
    class: string
    className: string
    comment: string
    constant: string
    deleted: string
    doctype: string
    entity: string
    function: string
    hexcode: string
    id: string
    important: string
    inserted: string
    keyword: string
    number: string
    operator: string
    prolog: string
    property: string
    pseudoClass: string
    pseudoElement: string
    punctuation: string
    regex: string
    selector: string
    string: string
    symbol: string
    tag: string
    unit: string
    url: string
    variable: string
  }
}

export interface ThemeColorInputStateOptions {
  bg: string
  fg: string
  border: string
  placeholder: string
}

export interface ThemeColorInputStatesOptions {
  enabled: ThemeColorInputStateOptions
  disabled: ThemeColorInputStateOptions
  invalid: ThemeColorInputStateOptions
  readOnly: ThemeColorInputStateOptions
  hovered: ThemeColorInputStateOptions
}

export interface ThemeColorStatesOptions {
  enabled: ThemeColorStateOptions
  disabled: ThemeColorStateOptions
  hovered: ThemeColorStateOptions
  pressed: ThemeColorStateOptions
  selected: ThemeColorStateOptions
}

export interface ThemeColorModeToneOptions {
  states: ThemeColorStatesOptions
  input: {
    valid: ThemeColorInputStatesOptions
    invalid: ThemeColorInputStatesOptions
  }
  focusRing: string
  shadow: {
    outline: string
    umbra: string
    penumbra: string
    ambient: string
  }
}

export interface ThemeColorModeOptions {
  tones: {
    [tone: string]: ThemeColorModeToneOptions
  }
}

export interface ThemeColorToneOptions {
  [mode: string]: ThemeColorModeOptions
}

/**
 * Contains tones
 */
export interface ThemeColorPaletteOptions {
  [tone: string]: ThemeColorToneOptions
}

/**
 * Contains palettes
 */
export interface ThemeColorSchemeOptions {
  [palette: string]: ThemeColorPaletteOptions
}

export interface ThemeColorSchemesOptions {
  [scheme: string]: ThemeColorSchemeOptions
}

export interface ThemeColorOptions {
  defaultMode?: string
  defaultPalette?: string
  defaultScheme?: string
  defaultTone?: string
  scheme: ThemeColorSchemesOptions
}

export interface ThemeOptions extends Omit<ThemeV0, 'color'> {
  border?: {
    [style: string]: {
      style: 'solid' | 'dotted' | 'dashed'
      width: number
    }
  }

  color: ThemeColorOptions
}

export interface ThemeColorState extends ThemeColorStateOptions {
  base: ThemeColorModeOptions
  // input: ThemeColor
}

export interface ThemeColorInputState extends ThemeColorInputStateOptions {
  base: ThemeColorModeOptions
}

export interface ThemeColor {
  _options: ThemeColorOptions

  // _schemes: ThemeColorSchemesOptions
  config: {
    mode?: string
    palette?: string
    scheme?: string
    tone?: string
  }

  mode: ThemeColorModeOptions
  palette: ThemeColorPaletteOptions
  /**
   * Contains palettes
   */
  scheme: ThemeColorSchemeOptions
  tone: ThemeColorToneOptions

  // state: (
  //   state: 'enabled' | 'disabled' | 'hovered' | 'pressed' | 'selected',
  //   opts?: ColorProps
  // ) => ThemeColorState
  // input: (state: 'enabled', opts?: ColorProps) => ThemeColorInputState
}

export interface ThemeV1 extends Omit<ThemeV0, 'color'> {
  _parent?: ThemeV1
  color: ThemeColor
}

export function createTheme(options: ThemeOptions): ThemeV1 {
  const {color: colorOption, ...restOptions} = options

  const {
    defaultMode: mode = 'default',
    defaultPalette: palette = 'default',
    defaultScheme: scheme = 'light',
    defaultTone: tone = 'default',
    scheme: schemes,
  } = colorOption

  const _scheme = schemes[scheme]
  const _palette = _scheme[palette || 'default'] || _scheme[palette]
  const _tone = _palette[tone || 'default'] || _palette.default
  const _mode = _tone[mode || 'default'] || _tone.default

  return {
    ...restOptions,
    color: {
      _options: colorOption,

      config: {
        mode,
        palette,
        scheme,
        tone,
      },

      mode: _mode,
      palette: _palette,
      scheme: _scheme,
      tone: _tone,
    },
  }
}
