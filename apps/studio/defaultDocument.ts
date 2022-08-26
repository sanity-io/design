import {DefaultDocumentNodeResolver} from 'sanity/desk'
// import {ArticlePreview} from './components/articlePreview'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  // Add `Preview` tab to the `article` document form
  // if (schemaType === 'article') {
  //   return S.document().views([S.view.form(), S.view.component(ArticlePreview).title('Preview')])
  // }

  return undefined
}
