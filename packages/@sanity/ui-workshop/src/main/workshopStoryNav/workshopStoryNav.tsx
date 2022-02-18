import {Box, Tree, TreeItem} from '@sanity/ui'
import React, {useCallback, useMemo} from 'react'
import {useWorkshop} from '../../useWorkshop'
import {buildMenu} from './helpers'
import {MenuCollection, MenuList, MenuScope} from './types'

export function WorkshopStoryNav(props: {collections?: MenuCollection[]}): React.ReactElement {
  const {collections = []} = props
  const {scopes} = useWorkshop()
  const menu = useMemo(() => buildMenu(collections, scopes), [collections, scopes])

  return useMemo(
    () => (
      <Box
        borderRight
        display={['none', 'none', 'block']}
        flex={1}
        overflow="auto"
        style={{minWidth: 180, maxWidth: 300}}
        tone="default"
      >
        {menu.type === 'list' && (
          <Box padding={3}>
            <Tree space={1}>
              <MenuItems items={menu.items} />
            </Tree>
          </Box>
        )}
      </Box>
    ),
    [menu]
  )
}

function MenuItems(props: {basePath?: string; items: Array<MenuList | MenuScope>}) {
  const {basePath = '', items} = props
  const {location, scope: currentScope, story: currentStory, pushLocation} = useWorkshop()

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault()

      const target = event.currentTarget
      const targetPath = target.getAttribute('data-path')

      if (targetPath) {
        pushLocation({path: targetPath})
      }
    },
    [pushLocation]
  )

  return useMemo(() => {
    if (items.length === 0) {
      return null
    }

    return (
      <>
        {items.map((item, itemIndex) => {
          if (item.type === 'list') {
            const path = `${basePath}/${item.name}`

            return (
              <TreeItem
                expanded={location.path.startsWith(path + '/')}
                fontSize={1}
                key={item.name || itemIndex}
                padding={2}
                text={item.title}
                weight="semibold"
              >
                <MenuItems basePath={path} items={item.items} />
              </TreeItem>
            )
          }

          if (item.type === 'scope') {
            return (
              <TreeItem
                expanded={item.scope === currentScope}
                fontSize={1}
                key={item.name}
                padding={2}
                text={item.title}
                weight="semibold"
              >
                {item.scope.stories.map((story) => (
                  <TreeItem
                    data-path={`/${item.scope.name}/${story.name}`}
                    fontSize={1}
                    href={`/${item.scope.name}/${story.name}`}
                    key={story.name}
                    onClick={handleStoryClick}
                    padding={2}
                    selected={currentStory === story}
                    text={story.title}
                  />
                ))}
              </TreeItem>
            )
          }

          return <TreeItem key={itemIndex} text="unknown" />
        })}
      </>
    )
  }, [basePath, currentScope, currentStory, handleStoryClick, items, location.path])
}
