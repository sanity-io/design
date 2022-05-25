import {defineConfig} from '@sanity/ui-workshop'

export default defineConfig({
  collections: [
    {name: 'ui', title: '@sanity/ui'},
    {name: 'ui/components', title: 'Components'},
    {name: 'ui/hooks', title: 'Hooks'},
    {name: 'ui/primitives', title: 'Primitives'},
    {name: 'ui/utils', title: 'Utils'},
  ],
  title: '@sanity/ui',
})
