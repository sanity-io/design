import {createElement} from 'react'
import {WorkshopCollection, WorkshopScope} from '../../types'
import {buildNavNodes} from './navNodes'

const component = () => createElement('div')

describe('workshopStoryNav/navNodes', () => {
  it('should build menu', () => {
    const collections: WorkshopCollection[] = [
      {
        name: 'lib1',
        title: 'Library 1',
      },
      {
        name: 'lib2',
        title: 'Library 2',
      },
    ]

    const scopes: WorkshopScope[] = [
      {
        name: 'lib1/first',
        title: 'First scope',
        stories: [
          {
            name: 'story1',
            title: 'Story 1',
            component,
          },
          {
            name: 'story2',
            title: 'Story 3',
            component,
          },
        ],
      },

      {
        name: 'lib2/first',
        title: 'Second scope',
        stories: [
          {
            name: 'story1',
            title: 'Story 1',
            component,
          },
          {
            name: 'story2',
            title: 'Story 3',
            component,
          },
        ],
      },

      {
        name: 'lib2/first/components',
        title: 'Second components',
        stories: [
          {
            name: 'story1',
            title: 'Story 1',
            component,
          },
          {
            name: 'story2',
            title: 'Story 3',
            component,
          },
        ],
      },
    ]

    const nodes = buildNavNodes(scopes, collections)

    expect(nodes).toMatchSnapshot()
  })
})
