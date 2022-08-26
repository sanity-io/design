import createSanityClient from '@sanity/client'

export const client = createSanityClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  apiVersion: '2022-08-01',
  useCdn: false,
})
