import {useCallback, useState} from 'react'
import {TextInput} from '../textInput'

export default function ClearButtonStory() {
  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  const handleClear = useCallback(() => {
    setValue('')
  }, [])

  return (
    <TextInput
      clearButton
      onChange={handleChange}
      onClear={handleClear}
      placeholder="Enter text"
      value={value}
    />
  )
}
