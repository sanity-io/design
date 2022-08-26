import {icons} from '@sanity/icons'
import {defineType} from 'sanity'
import {codeExampleField} from './codeExampleField'
import {npmPackageBadgeField} from './npmPackageBadgeField'
import {propertyTableField} from './propertyTableField'

export const figmaEmbedBlock = defineType({
  type: 'object',
  name: 'content.figmaEmbed',
  title: 'Figma embed',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title',
    },
    {
      type: 'string',
      name: 'url',
      title: 'Figma URL',
    },
  ],
})

export const figmaButtonBlock = defineType({
  type: 'object',
  name: 'content.figmaButton',
  title: 'Figma button',
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
    },
  ],
})

const codeBlock = defineType({
  type: 'code',
  name: 'code',
  title: 'Code',
})

const colorGridBlock = defineType({
  type: 'object',
  name: 'content.colorGrid',
  title: 'Color grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
})

const sanityLogoGridBlock = defineType({
  type: 'object',
  name: 'content.sanityLogoGrid',
  title: 'Sanity logo grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
})

const groqLogoGridBlock = defineType({
  type: 'object',
  name: 'content.groqLogoGrid',
  title: 'GROQ logo grid',
  fields: [{type: 'boolean', name: 'test', title: 'Test'}],
})

const imageBlock = defineType({
  title: 'Image',
  name: 'image',
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text (for screen readers)',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
      options: {
        isHighlighted: true,
      },
    },
  ],
  options: {
    hotspot: true,
  },
})

export const calloutBlock = defineType({
  type: 'object',
  name: 'callout',
  title: 'Callout',
  fields: [
    {
      type: 'string',
      name: 'icon',
      title: 'Icon',
      options: {
        list: Object.keys(icons),
      },
    },
    {
      type: 'string',
      name: 'tone',
      title: 'Tone',
      options: {
        list: ['primary', 'positive', 'caution', 'critical'],
      },
    },
    {type: 'array', name: 'content', title: 'Content', of: [{type: 'block'}]},
  ],
})

export const contentField = defineType({
  type: 'array',
  name: 'content',
  title: 'Content',
  of: [
    {type: 'block'},
    codeBlock,
    codeExampleField,
    npmPackageBadgeField,
    propertyTableField,
    colorGridBlock,
    sanityLogoGridBlock,
    groqLogoGridBlock,
    imageBlock,
    calloutBlock,
    figmaEmbedBlock,
    figmaButtonBlock,
  ],
})
