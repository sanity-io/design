import {Flex, Text, ThemeColorSpotKey} from '@sanity/ui'
import {useSelect} from '@sanity/ui-workshop'
import React from 'react'
import styled, {css} from 'styled-components'
import {WORKSHOP_SPOT_COLOR_OPTIONS} from '../../../__workshop__/constants'
import {ThemeProps} from '../../../styles'

const ColoredText = styled(Text)<{color?: ThemeColorSpotKey}>(
  (props: {color?: ThemeColorSpotKey} & ThemeProps) => {
    const {spot} = props.theme.sanity.color.mode.states.enabled

    return css`
      color: ${spot[props.color || 'gray']};
    `
  }
)

export default function ColoredTextStory() {
  const color = useSelect('Color', WORKSHOP_SPOT_COLOR_OPTIONS, 'gray')

  return (
    <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
      <ColoredText align="center" color={color} size={4} weight="bold">
        {color}
      </ColoredText>
    </Flex>
  )
}
