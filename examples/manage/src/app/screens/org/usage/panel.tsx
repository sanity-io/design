import {Box, Card, Container, Heading} from '@sanity/ui'
import React from 'react'

export function UsagePanel() {
  return (
    <Card>
      <Container width={3}>
        <Box paddingX={4} paddingY={6}>
          <Heading>Usage</Heading>
        </Box>
      </Container>
    </Card>
  )
}
