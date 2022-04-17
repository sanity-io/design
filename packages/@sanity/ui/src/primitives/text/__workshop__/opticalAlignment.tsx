import {AddCircleIcon} from '@sanity/icons'
import {Box} from '../../box'
import {Card} from '../../card'
import {Flex} from '../../flex'
import {Stack} from '../../stack'
import {Text} from '../text'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        <Flex>
          <Card padding={0} scheme="dark">
            <Text size={4}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Text size={3}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Text size={2}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Text size={1}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Text size={0}>Hamburgefonstiv M</Text>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} scheme="dark">
            <Text>
              <AddCircleIcon />
            </Text>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
