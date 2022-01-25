import {ArrowLeftIcon, ArrowRightIcon} from '@sanity/icons'
import {format} from 'date-fns'
import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react'
import {Box, Button, Card, Flex, Grid, Text} from '../../primitives'
import {parseDate} from './utils/parseDate'

const TIME_MINUTE = 1000 * 60
const TIME_HOUR = TIME_MINUTE * 60
const TIME_DAY = TIME_HOUR * 24
const TIME_WEEK = TIME_DAY * 7

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export function Calendar(props: {
  onChange?: (nextValue: string) => void
  value?: string
}): React.ReactElement {
  const {onChange, value} = props
  const parsedValue = useMemo(() => (value ? parseDate(value) : null), [value])
  const date = useMemo(
    () => (parsedValue?.type === 'date' ? parsedValue.value : new Date()),
    [parsedValue]
  )
  const timestamp = useMemo(() => date.getTime(), [date])

  // current date
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth()
  const currentDay = date.getDate()

  // day
  const dayOffset = useMemo(
    () => (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7,
    [currentYear, currentMonth]
  )
  const daysInMonth = useMemo(
    () => new Date(currentYear, currentMonth + 1, 0).getDate(),
    [currentYear, currentMonth]
  )
  const daysArr = useMemo(() => Array.from(new Array(daysInMonth)), [daysInMonth])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        onChange?.(format(timestamp - TIME_WEEK, 'yyyy-MM-dd'))
      }

      if (event.key === 'ArrowDown') {
        onChange?.(format(timestamp + TIME_WEEK, 'yyyy-MM-dd'))
      }

      if (event.key === 'ArrowLeft') {
        onChange?.(format(timestamp - TIME_DAY, 'yyyy-MM-dd'))
      }

      if (event.key === 'ArrowRight') {
        onChange?.(format(timestamp + TIME_DAY, 'yyyy-MM-dd'))
      }
    },
    [onChange, timestamp]
  )

  const handlePrevMonthClick = useCallback(() => {
    const d = new Date(currentYear, currentMonth - 1)

    onChange?.(format(d, 'yyyy-MM-dd'))
  }, [currentMonth, currentYear, onChange])

  const handleNextMonthClick = useCallback(() => {
    const d = new Date(currentYear, currentMonth + 1)

    onChange?.(format(d, 'yyyy-MM-dd'))
  }, [currentMonth, currentYear, onChange])

  return (
    <Card border marginTop={1} onKeyDown={handleKeyDown} padding={1} radius={1}>
      <Flex gap={1} paddingBottom={1} style={{borderBottom: '1px solid var(--card-border-color)'}}>
        <Box>
          <Button icon={ArrowLeftIcon} mode="bleed" onClick={handlePrevMonthClick} padding={2} />
        </Box>
        <Box flex={1} padding={2}>
          <Text align="center" weight="semibold">
            {MONTHS[currentMonth]} {currentYear}
          </Text>
        </Box>
        <Flex>
          <Button icon={ArrowRightIcon} mode="bleed" onClick={handleNextMonthClick} padding={2} />
        </Flex>
      </Flex>

      <Grid columns={7} gap={1} paddingTop={1} rows={7}>
        <Box paddingY={2}>
          <Text align="center" size={[1, 2]}>
            Mo
          </Text>
        </Box>
        <Box paddingY={2}>
          <Text align="center" size={[1, 2]}>
            Tu
          </Text>
        </Box>
        <Box paddingY={2}>
          <Text align="center" size={[1, 2]}>
            We
          </Text>
        </Box>
        <Box paddingY={2}>
          <Text align="center" size={[1, 2]}>
            Th
          </Text>
        </Box>
        <Box paddingY={2}>
          <Text align="center" size={[1, 2]}>
            Fr
          </Text>
        </Box>
        <Box paddingY={2}>
          <Text align="center" muted size={[1, 2]} weight="medium">
            Sa
          </Text>
        </Box>
        <Box paddingY={2}>
          <Text align="center" muted size={[1, 2]} weight="medium">
            Su
          </Text>
        </Box>

        {<Box column={dayOffset} hidden={dayOffset === 0} />}

        {daysArr.map((_, idx) => {
          const day = idx + 1
          const selected = currentDay === day
          const date = new Date(currentYear, currentMonth, day, 1)

          return (
            <CalendarDayButton
              date={date}
              key={date.toJSON()}
              onChange={onChange}
              selected={selected}
            />
          )
        })}
      </Grid>
    </Card>
  )
}

const CalendarDayButton = memo(function CalendarDayButton(props: {
  date: Date
  onChange?: (nextValue: string) => void
  selected: boolean
}) {
  const {date, onChange, selected} = props
  const day = date.getDate()
  const dayOffset = date.getDay()
  const ref = useRef<HTMLDivElement | null>(null)
  const today = useMemo(() => new Date(), [])
  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()

  useEffect(() => {
    if (selected && ref.current !== document.activeElement) {
      ref.current?.focus()
    }
  }, [selected])

  const handleClick = useCallback(() => {
    onChange?.(format(date, 'yyyy-MM-dd'))
  }, [date, onChange])

  return (
    <Card
      __unstable_focusRing
      as="button"
      onClick={handleClick}
      paddingX={1}
      paddingY={2}
      pressed={selected}
      radius={2}
      ref={ref}
      tabIndex={selected ? 0 : -1}
      title={date.toLocaleDateString()}
      tone={isToday ? 'transparent' : undefined}
    >
      <Text
        align="center"
        muted={dayOffset < 1 || dayOffset > 5}
        size={[1, 2]}
        // weight={isToday ? 'bold' : undefined}
      >
        {day}
      </Text>
    </Card>
  )
})
