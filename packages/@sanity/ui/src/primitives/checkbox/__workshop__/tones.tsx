import React from 'react'
import {Card} from '../../card'
import {Flex} from '../../flex'
import {Stack} from '../../stack'
import {Checkbox} from '../checkbox'

export default function MultipleTonesStory() {
  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Stack>
        <Card padding={3} tone="primary">
          <Checkbox />
        </Card>
        <Card padding={3} tone="positive">
          <Checkbox />
        </Card>
        <Card padding={3} tone="caution">
          <Checkbox />
        </Card>
        <Card padding={3} tone="critical">
          <Checkbox />
        </Card>
      </Stack>
    </Flex>
  )
}
