import {Flex} from '../../../primitives'
import {Hotkeys} from '../hotkeys'

export default function PlainStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <Hotkeys keys={['Ctrl', 'Shift', 'P']} />
    </Flex>
  )
}
