import React from 'react'
import styled from 'styled-components'
import {Flex} from '../../flex'
import {Text} from '../../text'
import {Card} from '../card'

const StyledCard = styled(Card).attrs({forwardedAs: 'ol'})``

export default function StyledCardStory() {
  return (
    <Flex align="center" height="fill" justify="center">
      <StyledCard>
        <Text as="li">Styled</Text>
      </StyledCard>
    </Flex>
  )
}
