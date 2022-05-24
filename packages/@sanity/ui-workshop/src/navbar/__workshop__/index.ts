import {lazy} from 'react'
import {defineScope} from '../../define'

export default defineScope('ui-workshop/navbar', 'Navbar', [
  {
    name: 'breadcrumbs',
    title: 'Breadcrumbs',
    component: lazy(() => import('./BreadcrumbsStory')),
  },
])
