import {a11yPlugin, defineConfig, perfPlugin} from './packages/@sanity/ui-workshop/src'

export default defineConfig({
  collections: [
    {name: 'color', title: '@sanity/color'},
    {name: 'ui', title: '@sanity/ui'},
    {name: 'ui/components', title: 'Components'},
    {name: 'ui/hooks', title: 'Hooks'},
    {name: 'ui/primitives', title: 'Primitives'},
    {name: 'ui/utils', title: 'Utils'},
    {name: 'ui-workshop', title: '@sanity/ui-workshop'},
  ],
  plugins: [perfPlugin(), a11yPlugin()],
  title: 'Sanity Design System',
})
