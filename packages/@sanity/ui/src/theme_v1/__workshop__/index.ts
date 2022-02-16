import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/theme_v1', 'Theme v1', [
  {
    name: 'dev',
    title: 'Dev',
    component: lazy(() => import('./DevStory')),
  },
])
