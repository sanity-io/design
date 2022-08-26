import {defineType} from 'sanity'

export const apiText = defineType({
  type: 'object',
  name: 'api.text',
  title: 'Text',
  fields: [
    {
      type: 'string',
      name: 'text',
      title: 'Text',
    },
  ],
  readOnly: true,
})

export const apiReference = defineType({
  type: 'object',
  name: 'api.reference',
  title: 'Reference',
  fields: [
    {
      type: 'string',
      name: 'text',
      title: 'Text',
    },

    {
      type: 'reference',
      name: 'reference',
      title: 'Reference',
      to: [{type: 'api.interface'}],
      weak: true,
    },
  ],
  readOnly: true,
})
