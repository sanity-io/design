import {Box, Card, Tree, TreeItem} from '@sanity/ui'
import React, {memo, useCallback, useMemo} from 'react'
import {useWorkshop} from '../../useWorkshop'
import {buildNavNodes, NavNode} from './navNodes'
import {MenuCollection} from './types'

const EMPTY_ARRAY: never[] = []

export const WorkshopStoryNav = memo(function WorkshopStoryNav(props: {
  collections?: MenuCollection[]
}): React.ReactElement {
  const {collections = EMPTY_ARRAY} = props
  const {scopes} = useWorkshop()
  const navNodes = useMemo(() => buildNavNodes(scopes, collections), [collections, scopes])

  return (
    <Card
      borderRight
      display={['none', 'none', 'block']}
      flex={1}
      overflow="auto"
      style={{minWidth: 180, maxWidth: 300}}
    >
      <Box padding={3}>
        <Tree space={1}>
          <MenuItems items={navNodes} />
        </Tree>
      </Box>
    </Card>
  )
})

function MenuItems(props: {basePath?: string; items: NavNode[]}) {
  const {basePath = '', items} = props
  const {location, pushLocation} = useWorkshop()

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault()

      const target = event.currentTarget
      const targetPath = target.getAttribute('data-path')

      if (targetPath) pushLocation({path: targetPath})
    },
    [pushLocation]
  )

  return (
    <>
      {items.map((item, itemIndex) => {
        const path = `${basePath}/${item.name}`

        if (item.type === 'scope') {
          return (
            <TreeItem
              expanded={location.path.startsWith(path + '/')}
              fontSize={1}
              key={item.name}
              padding={2}
              text={item.title}
              weight="semibold"
            >
              <MenuItems basePath={path} items={item.children} />
            </TreeItem>
          )
        }

        if (item.type === 'story') {
          return (
            <TreeItem
              data-path={path}
              fontSize={1}
              href={path}
              key={item.name}
              onClick={handleStoryClick}
              padding={2}
              selected={path === location.path}
              text={item.title}
            />
          )
        }

        return <TreeItem key={itemIndex} text="unknown" />
      })}
    </>
  )
}
