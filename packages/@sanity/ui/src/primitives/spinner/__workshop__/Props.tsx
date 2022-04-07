import {useBoolean, useSelect} from '@sanity/ui-workshop'
import React from 'react'
import {WORKSHOP_TEXT_SIZE_OPTIONS} from '../../../__workshop__/constants'
import {Flex} from '../../flex'
import {Spinner} from '../spinner'

export default function Props() {
  const muted = useBoolean('Muted', false, 'Props')
  const size = useSelect('Size', WORKSHOP_TEXT_SIZE_OPTIONS, 2, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Spinner muted={muted} size={size} />
    </Flex>
  )
}
