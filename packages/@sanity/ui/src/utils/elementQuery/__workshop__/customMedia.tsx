import {Box, Card, ElementQuery, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

const TestCard = styled(Card)`
  --sanity-fg-color: orange;

  [data-eq-min~='0'] > & {
    --sanity-fg-color: green;
  }

  [data-eq-min~='1'] > & {
    --sanity-fg-color: blue;
  }
`

export default function CustomMediaQuery() {
  return (
    <Box padding={[3, 4, 5]}>
      <Box marginBottom={[3, 4, 5]}>
        <Text>Resize this frame to see the text color change:</Text>
      </Box>

      <ElementQuery media={[100, 200, 300]}>
        <TestCard padding={2} shadow={1}>
          <Text>This card sits inside an element query.</Text>
        </TestCard>
      </ElementQuery>
    </Box>
  )
}
