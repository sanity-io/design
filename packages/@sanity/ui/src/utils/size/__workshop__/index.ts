import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('utils/size', 'Size', [
  {
    name: 'default',
    title: 'Text',
    component: lazy(() => import('./contexts')),
  },
])
