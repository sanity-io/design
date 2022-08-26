import {Card, Code as UICode} from '@sanity/ui'
import React from 'react'
import {IntentLink} from 'sanity/_unstable'
import {ArrayOfObjectsInputProps} from 'sanity/form'
import styled from 'styled-components'

interface TokenValue {
  _key: string
  reference?: {_ref: string}
  text?: string
}

export type APITokensInputProps = ArrayOfObjectsInputProps<TokenValue>

const Code = styled(UICode)`
  & a {
    color: var(--card-link-color);

    &:hover {
      text-decoration: underline;
    }
  }
`

export function APITokensInput(props: APITokensInputProps) {
  const {value = []} = props

  return (
    <Card border padding={3} overflow="auto" radius={1}>
      <Code>
        {value.map((token) => (
          <TokenPreview key={token._key} token={token} />
        ))}
      </Code>
    </Card>
  )
}

function TokenPreview({token}: {token: TokenValue}) {
  if (token.reference?._ref) {
    return (
      <IntentLink intent="edit" params={{id: token.reference?._ref}}>
        {token.text}
      </IntentLink>
    )
  }

  return <>{token.text}</>
}
