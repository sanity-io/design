import {Box} from '@sanity/ui'
import React from 'react'
import {NavbarBreadcrumbs} from '../NavbarBreadcrumbs'

export default function BreadcrumbsStory(): React.ReactElement {
  return (
    <Box padding={4}>
      <NavbarBreadcrumbs />
    </Box>
  )
}
