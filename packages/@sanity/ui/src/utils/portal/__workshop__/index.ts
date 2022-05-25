import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/utils/portal', 'Portal', [
  {
    name: 'named',
    title: 'Named portals',
    component: lazy(() => import('./named')),
  },
])
