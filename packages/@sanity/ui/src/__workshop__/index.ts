import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('color', '@sanity/color', [
  {
    name: 'overview',
    title: 'Overview',
    component: lazy(() => import('./color/overview')),
  },
])
