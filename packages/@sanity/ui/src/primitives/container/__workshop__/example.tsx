import {useAction, useSelect} from '@sanity/ui-workshop'
import {WORKSHOP_CONTAINER_WIDTH_OPTIONS} from '../../../__workshop__/constants'
import {Card} from '../../card'
import {Flex} from '../../flex'
import {Text} from '../../text'
import {Container} from '../container'

export default function PlainStory() {
  const width = useSelect('Width', WORKSHOP_CONTAINER_WIDTH_OPTIONS, 0, 'Props')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Container onClick={useAction('onClick')} width={width}>
        <Card padding={4} shadow={1}>
          <Text>
            Container with <code>max-width={width}</code>
          </Text>
        </Card>
      </Container>
    </Flex>
  )
}
