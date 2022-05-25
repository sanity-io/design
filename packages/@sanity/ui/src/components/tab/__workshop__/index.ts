import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/components/tab', 'Tab', [
  {name: 'example', title: 'Example', component: lazy(() => import('./example'))},
])
