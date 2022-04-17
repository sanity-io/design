import {useSelect} from '@sanity/ui-workshop'
import {WORKSHOP_AVATAR_SIZE_OPTIONS} from '../../../__workshop__/constants'
import {Flex} from '../../flex'
import {Avatar} from '../avatar'

export default function AsButtonStory() {
  const size = useSelect('Size', WORKSHOP_AVATAR_SIZE_OPTIONS, 0, 'Props')

  return (
    <Flex align="center" height="fill" justify="center">
      <Avatar as="button" color="purple" initials="uq" size={size} />
    </Flex>
  )
}
