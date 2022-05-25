import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/components/hotkeys', 'Hotkeys', [
  {name: 'plain', title: 'Plain', component: lazy(() => import('./plain'))},
])
