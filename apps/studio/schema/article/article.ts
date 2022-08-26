import {defineType} from 'sanity'
import {contentField} from './content/contentField'

const titleField = defineType({type: 'string', name: 'title', title: 'Title'})

const figmaField = defineType({
  type: 'object',
  name: 'figma',
  title: 'Figma',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'string',
      name: 'url',
      title: 'URL',
      description: 'The URL to a Figma resource',
    },
  ],
  options: {
    collapsible: true,
    collapsed: true,
  },
})

const layoutField = defineType({
  type: 'object',
  name: 'layout',
  title: 'Layout',
  fields: [{type: 'boolean', name: 'wide', title: 'Wide'}],
})

export const article = defineType({
  type: 'document',
  name: 'article',
  title: 'Article',
  fields: [
    titleField,
    figmaField,
    contentField,
    layoutField,
    {
      type: 'seo',
      name: 'seo',
      title: 'SEO',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'seo.og.image',
    },
  },
})
