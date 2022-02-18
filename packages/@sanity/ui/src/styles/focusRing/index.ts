import {ThemeColorModeOptions} from '../../theme/v1/theme'

export function focusRingBorderStyle(border: {color: string; width: number}): string {
  return `inset 0 0 0 ${border.width}px ${border.color}`
}

export function focusRingStyle(opts: {
  base?: ThemeColorModeOptions // {bg: string}
  border?: {color: string; width: number}
  focusRing: {offset: number; width: number}
}): string {
  const {base, border, focusRing} = opts
  const focusRingOutsetWidth = focusRing.offset + focusRing.width
  const focusRingInsetWidth = 0 - focusRing.offset
  const bgColor = base ? base.tones.default?.states.enabled?.bg : 'var(--sanity-bg-color)'

  return [
    focusRingInsetWidth > 0 &&
      `inset 0 0 0 ${focusRingInsetWidth}px var(--sanity-focus-ring-color)`,
    border && focusRingBorderStyle(border),
    focusRingInsetWidth < 0 && `0 0 0 ${0 - focusRingInsetWidth}px ${bgColor}`,
    focusRingOutsetWidth > 0 && `0 0 0 ${focusRingOutsetWidth}px var(--sanity-focus-ring-color)`,
  ]
    .filter(Boolean)
    .join(',')
}
