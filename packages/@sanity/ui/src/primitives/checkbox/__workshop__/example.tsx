import {useCallback, useState} from 'react'
import {Box} from '../../box'
import {Flex} from '../../flex'
import {Text} from '../../text'
import {Checkbox} from '../checkbox'

export default function ExampleStory() {
  const [checked, setChecked] = useState<boolean | undefined>(undefined)
  const [indeterminate] = useState(checked === undefined)
  const handleChange = useCallback(() => setChecked((val) => !val), [])

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <Flex align="center" as="label">
        <Checkbox
          checked={checked || false}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
        <Box marginLeft={3}>
          <Text>Label</Text>
        </Box>
      </Flex>
    </Flex>
  )
}
