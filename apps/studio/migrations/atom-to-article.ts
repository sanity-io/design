import {SanityDocument} from '@sanity/client'
import {client} from './_runtime'

const fetchDocuments = () => client.fetch(`*[_type == 'atom']`)

async function migrate() {
  const docs: SanityDocument[] = await fetchDocuments()

  if (docs.length === 0) {
    console.log('nothing to migrate')

    return
  }

  return Promise.all(
    docs.map(({_id: prevId, ...doc}) => {
      console.log('previous id', prevId)

      return client.create({...doc, _type: 'article'})
    })
  )
}

migrate().catch((err) => {
  console.error(err)

  process.exit(1)
})
