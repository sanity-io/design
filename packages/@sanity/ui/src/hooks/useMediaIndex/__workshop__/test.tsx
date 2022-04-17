import {Card, Stack, Text} from '../../../primitives'
import {useMediaIndex} from '../useMediaIndex'

export default function TestStory() {
  const mediaIndex = useMediaIndex()

  return (
    <Card padding={[3, 4, 5]}>
      <Stack space={2}>
        <Text weight="semibold">The current media index is {mediaIndex}.</Text>
        <Text muted>Try resizing the browser.</Text>
      </Stack>
    </Card>
  )
}
