import {WorkshopCollection, WorkshopScope} from '../..'
import {buildMenu} from './helpers'

describe('workshopStoryNav/helpers', () => {
  it('should build menu', () => {
    const collections: WorkshopCollection[] = [
      {
        name: 'test',
        title: 'Test',
      },
    ]

    const scopes: WorkshopScope[] = [
      {
        name: 'test/first',
        title: 'First',
        stories: [],
      },
    ]

    const menu = buildMenu(collections, scopes)

    console.log('menu', JSON.stringify(menu, null, 2))
  })
})
