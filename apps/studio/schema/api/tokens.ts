import {defineType} from 'sanity'
import {APITokensInput} from './components/APITokensInput'

export const apiTokens = defineType({
  type: 'array',
  name: 'api.tokens',
  title: 'Tokens',
  of: [{type: 'api.text'}, {type: 'api.reference'}],
  components: {input: APITokensInput},
})
