import {codeInput} from '@sanity/code-input'
import {createConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {StudioLogo} from './components/StudioLogo'
import {defaultDocumentNode} from './defaultDocument'
import {schemaTypes} from './schema'
import {structure} from './structure'

export default createConfig({
  name: 'design',
  title: 'Design',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,
  logo: StudioLogo,
  plugins: [
    codeInput(),
    deskTool({
      structure,
      defaultDocumentNode,
    }),
  ],
  schema: {types: schemaTypes},
})
