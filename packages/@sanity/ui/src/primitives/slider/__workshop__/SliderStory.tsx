import React, {useCallback, useState} from 'react'
import {Container} from '../../container'
import {Flex} from '../../flex'
import {SliderInput} from '../slider'

export default function SliderStory(): React.ReactElement {
  const [value, setValue] = useState(50)

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.currentTarget.value))
  }, [])

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <Container width={0}>
        <SliderInput min={0} max={100} onChange={handleChange} value={value} />
      </Container>
    </Flex>
  )
}
