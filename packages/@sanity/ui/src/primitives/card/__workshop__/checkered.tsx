import {Flex} from '../../flex'
import {Stack} from '../../stack'
import {Card} from '../card'

export default function CheckeredStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack space={1}>
        <Card __unstable_checkered border style={{width: 120, height: 60}} />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="transparent" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="primary" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="positive" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="caution" />
        <Card __unstable_checkered border style={{width: 120, height: 60}} tone="critical" />
      </Stack>
    </Flex>
  )
}
