import {CodeBlockIcon} from '@sanity/icons'
import {defineType} from 'sanity'

export const codeExampleField = defineType({
  icon: CodeBlockIcon,
  type: 'object',
  name: 'codeExample',
  title: 'Code example',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'text',
      name: 'description',
      title: 'Description',
    },
    {
      type: 'code',
      name: 'code',
      title: 'Code',
    },
    {
      type: 'code',
      name: 'hook',
      title: 'React hook code',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
