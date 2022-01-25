import {Box, DatetimeInput} from '@sanity/ui'
import React from 'react'
import {Container} from '../../../primitives'

export default function ExampleStory() {
  return (
    <Box padding={4}>
      <Container width={0}>
        <DatetimeInput />
      </Container>
    </Box>
  )
}
