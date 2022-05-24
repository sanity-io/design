import {lazy} from 'react'
import {defineScope} from '../../define'

export default defineScope('ui-workshop/navigator', 'Navigator', [
  {
    name: 'search-results',
    title: 'Search results',
    component: lazy(() => import('./SearchResultsStory')),
  },
])
