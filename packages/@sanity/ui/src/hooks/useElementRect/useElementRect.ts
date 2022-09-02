import {useElementSize} from '../useElementSize'

/**
 * Subscribe to the rect of a DOM element.
 * @deprecated Use `useElementSize` instead
 *
 * @beta
 */
export function useElementRect(element: HTMLElement | null): DOMRectReadOnly | null {
  const elementSize = useElementSize(element)

  return elementSize?._contentRect || null
}
