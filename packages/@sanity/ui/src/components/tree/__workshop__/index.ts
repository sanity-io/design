import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/components/tree', 'Tree', [
  {
    name: 'basic',
    title: 'Basic',
    component: lazy(() => import('./basic')),
    // options: {perfTests: () => import('./basic.perf')},
  },
])
