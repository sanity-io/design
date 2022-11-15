import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('ui/slider', 'Slider', [
  {
    name: 'test',
    title: 'Test',
    component: lazy(() => import('./SliderStory')),
  },
])
