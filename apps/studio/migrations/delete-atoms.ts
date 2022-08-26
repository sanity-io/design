import {SanityDocument} from '@sanity/client'
import {client} from './_runtime'

const fetchDocuments = () => client.fetch(`*[_type == 'atom']{_id}`)

async function migrate() {
  const docs: SanityDocument[] = await fetchDocuments()

  return Promise.all(
    docs.map(({_id: prevId}) => {
      // eslint-disable-next-line no-console
      console.log('deleting previous id', prevId)

      return client.delete(prevId)
    })
  )
}

migrate().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
