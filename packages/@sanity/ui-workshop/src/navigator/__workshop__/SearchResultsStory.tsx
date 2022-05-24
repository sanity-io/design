import {Box, Card} from '@sanity/ui'
import React, {useMemo} from 'react'
import {WorkshopScope, WorkshopStory} from '../../types'
import {SearchResults} from '../SearchResults'
import {SearchResultMatch} from '../types'

export default function SearchResultsStory(): React.ReactElement {
  const matches: SearchResultMatch[] = useMemo(
    () => [
      {
        scope: {name: 'scope', title: 'Scope'} as WorkshopScope,
        story: {name: 'story', title: 'Story'} as WorkshopStory,
      },
    ],
    []
  )

  return (
    <Box padding={4}>
      <Card shadow={1}>
        <SearchResults matches={matches} onStoryClick={() => undefined} />
      </Card>
    </Box>
  )
}
