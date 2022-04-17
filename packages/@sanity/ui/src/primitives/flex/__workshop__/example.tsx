import {useSelect} from '@sanity/ui-workshop'
import styled from 'styled-components'
import {WORKSHOP_FLEX_DIRECTION_OPTIONS} from '../../../__workshop__/constants'
import {Card} from '../../card'
import {Code} from '../../code'
import {Flex} from '../flex'

const DebugCard = styled(Card)`
  outline: 1px solid red;
  &:not([hidden]) {
    display: flex;
  }
  align-items: center;
  justify-content: center;
`

export default function ExampleStory() {
  const direction = useSelect('Direction', WORKSHOP_FLEX_DIRECTION_OPTIONS, 'row', 'Props')

  return (
    <Flex direction={direction} height="fill" style={{width: '100%'}}>
      <DebugCard flex={1}>
        <Code>1</Code>
      </DebugCard>

      <DebugCard flex={[1, 2, 3]}>
        <Code>[1,2,3]</Code>
      </DebugCard>

      <DebugCard flex={['none', 'none', 1]}>
        <Code>['none', 'none', 1]</Code>
      </DebugCard>
    </Flex>
  )
}
