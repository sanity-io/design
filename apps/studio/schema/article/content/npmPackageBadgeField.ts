import {defineType} from 'sanity'

export const npmPackageBadgeField = defineType({
  type: 'object',
  name: 'npmPackageBadge',
  title: 'NPM package badge',
  fields: [
    {
      type: 'string',
      name: 'name',
      title: 'Package name',
    },
  ],
})
