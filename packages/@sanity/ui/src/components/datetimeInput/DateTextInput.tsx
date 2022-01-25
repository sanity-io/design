import {format} from 'date-fns'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {TextInput} from '../../primitives'
import {formatDate} from './utils/formatDate'
import {parseDate} from './utils/parseDate'

export function DateTextInput(props: {
  onChange?: (nextValue?: string) => void
  value?: string
}): React.ReactElement {
  const {onChange, value} = props

  const parsedValue = useMemo(() => (value ? parseDate(value) : null), [value])

  const [inputValue, setInputValue] = useState(() =>
    parsedValue?.type === 'date' ? formatDate(parsedValue.value) : value
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

    const p = parseDate(inputValue)

    if (p.type === 'error') {
      setError(p.error)
    } else {
      setError(null)
      onChange?.(format(p.value, 'yyyy-MM-dd'))
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

  const customValidity = error ? 'Error' : undefined

  useEffect(() => {
    const p = parsedValue

    if (!p) return

    if (p.type === 'error') {
      setError(p.error)
    } else {
      setInputValue(formatDate(p.value))
      setError(null)
    }
  }, [parsedValue])

  useEffect(() => {
    if (!value) {
      setInputValue(undefined)
      setError(null)
    }
  }, [value])

  // if (parsedValue?.type === 'error') {
  //   return (
  //     <Card padding={3} tone="critical">
  //       <Text>{parsedValue.error.message}</Text>
  //     </Card>
  //   )
  // }

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
