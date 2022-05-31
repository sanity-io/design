import {useSelect} from '@sanity/ui-workshop'
import React, {useCallback, useState} from 'react'
import {WORKSHOP_TEXT_INPUT_TYPE_OPTIONS} from '../../../../test/workshop'
import {TextInput} from '../textInput'

export default function TypedStory() {
  const type = useSelect('Type', WORKSHOP_TEXT_INPUT_TYPE_OPTIONS, 'text', 'Props')

  const [value, setValue] = useState('')

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }, [])

  return <TextInput onChange={handleChange} type={type} value={value} />
}
