import {WorkshopScope} from '../../types'
import {MenuCollection} from './types'

export interface NavStoryNode {
  type: 'story'
  name: string
  title?: string
  children: Array<NavScopeNode | NavStoryNode>
}

export interface NavScopeNode {
  type: 'scope'
  name: string
  title?: string
  children: Array<NavScopeNode | NavStoryNode>
}

export type NavNode = NavScopeNode | NavStoryNode

export function buildNavNodes(scopes: WorkshopScope[], collections?: MenuCollection[]): NavNode[] {
  const nodes = []

  for (const scope of scopes) {
    const scopePath = scope.name.split('/')

    nodes.push({
      type: 'scope' as const,
      path: scopePath,
      title: scope.title,
    })

    for (const story of scope.stories) {
      nodes.push({
        type: 'story' as const,
        path: scopePath.concat(story.name.split('/')),
        title: story.title,
        component: story.component,
      })
    }
  }

  const tree: NavNode = {
    type: 'scope',
    name: '$root',
    children: [],
  }

  for (const node of nodes) {
    let parent: NavNode = tree

    for (const name of node.path) {
      let child: NavNode | undefined = parent.children.find((c) => c.name === name)

      if (!child) {
        child = {type: node.type, name, title: node.title, children: []}
        parent.children.push(child!)
      }

      parent = child!
    }
  }

  if (collections) {
    for (const collection of collections) {
      const path = collection.name.split('/')

      const parent = tree

      let child = null

      for (const segment of path) {
        child = parent.children.find((c) => c.name === segment)

        if (!child) {
          break
        }
      }

      if (child) {
        child.title = collection.title
      }
    }
  }

  // console.log('nodes', JSON.stringify(nodes, null, 2))

  // const menu = buildMenu(collections, scopes)

  // console.log('menu', JSON.stringify(menu, null, 2))

  return tree.children
}
