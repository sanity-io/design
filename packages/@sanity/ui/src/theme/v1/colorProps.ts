import {ThemeV1} from './theme'

export interface ColorProps {
  mode?: string
  palette?: string
  tone?: string
}

export function getColorProps(parent: ColorProps, color: ColorProps, theme?: ThemeV1): ColorProps {
  const ret: ColorProps = {
    mode: parent.mode ? undefined : theme?.color.mode,
    palette: parent.palette ? undefined : theme?.color.palette,
    tone: parent.tone ? undefined : theme?.color.tone,
  }

  // mode
  if (color.mode ? color.mode !== parent.mode : !parent.mode) {
    ret.mode = color.mode
    // ret.tone = parent.tone || color.tone
    ret.palette = parent.palette || color.palette
  }

  // palette
  if (color.palette ? color.palette !== parent.palette : !parent.palette) {
    ret.palette = color.palette
    ret.tone = parent.tone || color.tone
  }

  // tone
  if (color.tone && color.tone !== parent.tone) {
    ret.tone = color.tone
  }

  return ret
}
