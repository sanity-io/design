import {CSSObject} from 'styled-components'
// import {ThemeColorBase, ThemeColorGenericState} from '../../theme'
import {ThemeColorModeOptions, ThemeColorStateOptions} from '../../theme/v1/theme'

/**
 * @internal
 */
export function _colorVarsStyle(
  mode: ThemeColorModeOptions | undefined,
  state: ThemeColorStateOptions,
  // base: ThemeColorBase,
  // color: ThemeColorGenericState,
  checkered = false
): CSSObject {
  if (!mode) return {}

  const {focusRing, shadow} = mode.tones.default || {}

  return {
    // Base
    // @todo: rename to "--base-"?
    '--sanity-shadow-outline-color': shadow?.outline,
    '--sanity-shadow-umbra-color': shadow?.umbra,
    '--sanity-shadow-penumbra-color': shadow?.penumbra,
    '--sanity-shadow-ambient-color': shadow?.ambient,
    '--sanity-focus-ring-color': focusRing,

    // Card
    '--sanity-bg-color': state.bg,
    '--sanity-bg-image': checkered
      ? `repeating-conic-gradient(${state.bg} 0% 25%, ${state.bg2 || state.bg} 0% 50%)`
      : undefined,
    '--sanity-fg-color': state.fg,
    '--sanity-border-color': state.border,
    // '--sanity-muted-fg-color': state.muted?.fg,
    // '--sanity-accent-fg-color': state.accent?.fg,
    '--sanity-link-fg-color': state.link?.fg,
    '--sanity-code-bg-color': state.code?.bg,
    '--sanity-code-fg-color': state.code?.fg,
    '--sanity-skeleton-color-from': state.skeleton?.from,
    '--sanity-skeleton-color-to': state.skeleton?.to,

    // @todo: deprecate
    '--sanity-link-color': state.link?.fg,
    '--sanity-hairline-soft-color': state.border,
    '--sanity-hairline-hard-color': state.border,
  }
}
