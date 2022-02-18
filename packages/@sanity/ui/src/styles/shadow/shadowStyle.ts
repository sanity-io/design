import {CSSObject} from 'styled-components'
import {getResponsiveProp} from '..'
import {EMPTY_RECORD} from '../../constants'
import {BoxShadow, ThemeShadow} from '../../theme'
import {rem, responsive} from '../helpers'
import {ThemeProps} from '../types'
import {ResponsiveShadowStyleProps} from './types'

function toBoxShadow(shadow: BoxShadow, color: string) {
  return `${shadow.map(rem).join(' ')} ${color}`
}

function shadowStyle(shadow: ThemeShadow | null): CSSObject {
  if (!shadow) return EMPTY_RECORD

  const outline = `0 0 0 ${rem(1)} var(--sanity-shadow-outline-color)`
  const umbra = toBoxShadow(shadow.umbra, 'var(--sanity-shadow-umbra-color)')
  const penumbra = toBoxShadow(shadow.penumbra, 'var(--sanity-shadow-penumbra-color)')
  const ambient = toBoxShadow(shadow.ambient, 'var(--sanity-shadow-ambient-color)')

  return {boxShadow: `${outline}, ${umbra}, ${penumbra}, ${ambient}`}
}

export function responsiveShadowStyle(props: ResponsiveShadowStyleProps & ThemeProps): CSSObject[] {
  const {theme} = props
  const {media, shadows} = theme.sanity

  return responsive(media, getResponsiveProp(props.$shadow), (shadow) =>
    shadowStyle(shadows[shadow])
  )
}
