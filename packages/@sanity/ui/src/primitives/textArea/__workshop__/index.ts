import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/primitives/text-area', 'TextArea', [
  {
    name: 'plain',
    title: 'Plain',
    component: lazy(() => import('./plain')),
  },
])
