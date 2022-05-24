import {Breadcrumbs, Text} from '@sanity/ui'
import React, {memo, useCallback} from 'react'
import {useWorkshop} from '../useWorkshop'

export function NavbarBreadcrumbs(): React.ReactElement {
  const {broadcast, scope, story, title} = useWorkshop()

  const handleHomeClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      broadcast({type: 'workshop/setPath', value: '/'})
    },
    [broadcast]
  )

  return (
    <NavbarBreadcrumbsView
      onHomeClick={handleHomeClick}
      scopeTitle={scope?.title}
      storyTitle={story?.title}
      title={title}
    />
  )
}

const NavbarBreadcrumbsView = memo(function NavbarBreadcrumbsView(props: {
  onHomeClick: (event: React.MouseEvent) => void
  scopeTitle?: string
  storyTitle?: string
  title: string
}) {
  const {onHomeClick, scopeTitle, storyTitle, title} = props

  return (
    <Breadcrumbs
      separator={
        <Text muted size={1}>
          /
        </Text>
      }
      space={2}
    >
      <Text key="home" size={1} weight="bold">
        <a href="/" onClick={onHomeClick} style={{color: 'inherit'}}>
          {title}
        </a>
      </Text>

      {scopeTitle && (
        <Text align="center" key="scope" size={1}>
          {scopeTitle}
        </Text>
      )}

      {storyTitle && (
        <Text key="story" size={1}>
          {storyTitle}
        </Text>
      )}
    </Breadcrumbs>
  )
})
