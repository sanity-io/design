import {format} from 'date-fns'
import React, {useCallback, useState} from 'react'
import {Button, Card, Flex, Stack, Text} from '../../primitives'
import {Calendar} from './Calendar'
import {DateTextInput} from './DateTextInput'
import {TimeTextInput} from './TimeTextInput'

export function DatetimeInput(): React.ReactElement {
  const [dateValue, setDateValue] = useState<string | undefined>(() =>
    format(new Date(), 'yyyy-MM-dd')
  )
  const [timeValue, setTimeValue] = useState<string | undefined>(() => format(new Date(), 'HH:mm'))

  const handleClearClick = useCallback(() => {
    setDateValue(undefined)
    setTimeValue(undefined)
  }, [])

  const handleTodayClick = useCallback(() => {
    const d = new Date()

    setDateValue(format(d, 'yyyy-MM-dd'))
    setTimeValue(format(d, 'HH:mm'))
  }, [])

  return (
    <div>
      <Flex gap={1}>
        <Stack flex={1}>
          <DateTextInput onChange={setDateValue} value={dateValue} />
        </Stack>

        <Stack style={{width: 70}}>
          <TimeTextInput onChange={setTimeValue} value={timeValue} />
        </Stack>
      </Flex>

      <Calendar onChange={setDateValue} value={dateValue} />

      <Flex gap={1} paddingTop={1}>
        <Button mode="ghost" onClick={handleClearClick} text="Clear" />
        <Button mode="ghost" onClick={handleTodayClick} text="Today" />
      </Flex>

      <Card marginTop={3} padding={3} tone="transparent">
        <Text size={1}>
          {dateValue} {timeValue}
        </Text>
      </Card>
    </div>
  )
}
