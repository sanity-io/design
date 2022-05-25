import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/primitives/container', 'Container', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./example'))},
])
