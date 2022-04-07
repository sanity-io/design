import React from 'react'
import {Box} from '../../box'
import {Flex} from '../../flex'
import {Text} from '../../text'
import {Checkbox} from '../checkbox'

export default function ReadOnlyStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox id="checkbox-example" readOnly />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Flex>
  )
}
