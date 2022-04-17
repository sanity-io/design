import {AddCircleIcon} from '@sanity/icons'
import {Box} from '../../box'
import {Card} from '../../card'
import {Flex} from '../../flex'
import {Stack} from '../../stack'
import {Heading} from '../heading'

export default function OpticalAlignment() {
  return (
    <Box padding={[4, 5, 6]}>
      <Stack space={1}>
        <Flex>
          <Card padding={0} scheme="dark">
            <Heading size={5}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading size={4}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading size={3}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading size={2}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading size={1}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={0} scheme="dark">
            <Heading size={0}>Hamburgefonstiv M</Heading>
          </Card>
        </Flex>

        <Flex>
          <Card padding={2} scheme="dark">
            <Heading>
              <AddCircleIcon />
            </Heading>
          </Card>
        </Flex>
      </Stack>
    </Box>
  )
}
