import BlockContent from '@sanity/block-content-to-react'
import {Box, Text} from '@sanity/ui'
import React from 'react'
import styled from 'styled-components'

function BlockSerializer(props: any) {
  return (
    <Box marginY={[3, 3, 4]}>
      <Text as="p" muted size={[1, 1, 2]}>
        {props.children}
      </Text>
    </Box>
  )
}

const serializers = {
  block: BlockSerializer,
}

const Root = styled.div`
  & > .plain-block-content > *:first-child {
    margin-top: 0;
  }

  & > .plain-block-content > *:last-child {
    margin-bottom: 0;
  }
`

export function PlainBlockContent({blocks}: {blocks: any[]}) {
  return (
    <Root>
      <BlockContent
        blocks={blocks}
        className="plain-block-content"
        renderContainerOnSingleChild
        serializers={serializers}
      />
    </Root>
  )
}
