import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/primitives/grid', 'Grid', [
  {name: 'responsive', title: 'Responsive', component: lazy(() => import('./responsive'))},
])
