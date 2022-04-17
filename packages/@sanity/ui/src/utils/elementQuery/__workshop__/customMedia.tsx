import styled from 'styled-components'
import {Box, Card, Text} from '../../../primitives'
import {ElementQuery} from '../elementQuery'

const TestCard = styled(Card)`
  --card-fg-color: orange;

  [data-eq-min~='0'] > & {
    --card-fg-color: green;
  }

  [data-eq-min~='1'] > & {
    --card-fg-color: blue;
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
