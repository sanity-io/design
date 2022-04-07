import React from 'react'
import {Box} from '../../box'
import {Card} from '../../card'
import {Container} from '../../container'
import {Flex} from '../../flex'
import {Text} from '../../text'
import {Popover} from '../popover'

export default function MarginsStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Popover
        __unstable_margins={[-5, -5, -5, -5]}
        arrow={false}
        content={
          <Box padding={2}>
            <Text align="center" muted size={1}>
              Popover
            </Text>
          </Box>
        }
        matchReferenceWidth
        open
        placement="bottom-start"
        // radius={0}
      >
        <Container width={0}>
          <Card padding={2} muted shadow={1}>
            <Text align="center" muted size={1}>
              Reference
            </Text>
          </Card>
        </Container>
      </Popover>
    </Flex>
  )
}
