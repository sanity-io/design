import {Code} from '../../../primitives'
import {useLayer} from '../useLayer'

export function LayerDebugInfo() {
  const layer = useLayer()

  return (
    <Code>
      zIndex={layer.zIndex}, size={layer.size}
    </Code>
  )
}
