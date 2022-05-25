import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/utils/boundaryElement', 'BoundaryElement', [
  {
    name: 'plain',
    title: 'Plain',
    component: lazy(() => import('./plain')),
  },
])
