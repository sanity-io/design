import {format, parse} from 'date-fns'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {TextInput} from '../../primitives'

const TIME_FORMAT_1 = 'HH:mm'

function parseTime(value: string) {
  try {
    // TIME_FORMAT_1
    try {
      const p1 = parse(value, TIME_FORMAT_1, new Date())

      if (p1 instanceof Date && p1.toJSON()) {
        return {type: 'date' as const, value: p1}
      }
    } catch (e1) {
      // ignore
    }

    const d = Date.parse(value)

    if (isNaN(d)) {
      throw new Error('Could not parse date string')
    }

    return {type: 'date' as const, value: new Date(d)}
  } catch (e) {
    return {type: 'error' as const, error: e as Error}
  }
}

export function TimeTextInput(props: {
  onChange?: (nextValue?: string) => void
  value?: string
}): React.ReactElement {
  const {onChange, value} = props

  const parsedValue = useMemo(() => (value ? parseTime(value) : null), [value])

  const [inputValue, setInputValue] = useState(() =>
    parsedValue?.type === 'date' ? format(parsedValue.value, TIME_FORMAT_1) : value
  )

  const [error, setError] = useState<Error | null>(
    parsedValue?.type === 'error' ? parsedValue.error : null
  )

  const updateValue = useCallback(() => {
    if (!inputValue) {
      onChange?.()
      setError(null)
      setInputValue(undefined)

      return
    }

    const p = parseTime(inputValue)

    if (p.type === 'error') {
      setError(p.error)
    } else {
      setError(null)
      onChange?.(format(p.value, TIME_FORMAT_1))
      setInputValue(format(p.value, TIME_FORMAT_1))
    }
  }, [inputValue, onChange])

  const handleBlur = useCallback(() => {
    updateValue()
  }, [updateValue])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value)
  }, [])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (inputValue !== value && event.key === 'Enter') {
        event.preventDefault()
        updateValue()
      }
    },
    [inputValue, updateValue, value]
  )

  const customValidity = error ? error.message : undefined

  useEffect(() => {
    const p = parsedValue

    if (!p) return

    if (p.type === 'error') {
      setError(p.error)
    } else {
      setInputValue(format(p.value, TIME_FORMAT_1))
      setError(null)
    }
  }, [parsedValue])

  useEffect(() => {
    if (!value) {
      setInputValue(undefined)
      setError(null)
    }
  }, [value])

  return (
    <TextInput
      customValidity={customValidity}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={inputValue || ''}
    />
  )
}
