import {LinkIcon} from '@sanity/icons'
import {Box, Text, Tree, TreeItem} from '@sanity/ui'
import {usePerfTest} from '@sanity/ui-workshop'
import React, {memo, useCallback, useMemo, useState} from 'react'
import {perfTests} from './basic.perf'

interface NodeType {
  icon?: React.ComponentType
  id: string
  title: string
  children: NodeType[]
}

const tree: NodeType = {
  id: '$root',
  title: 'Root',
  children: [
    {
      id: 'fruit',
      title: 'Fruit',
      children: [
        {id: 'oranges', title: 'Oranges', children: []},
        {id: 'pineapples', title: 'Pineapples', children: []},
        {
          id: 'apples',
          title: 'Apples',
          children: [
            {id: 'macintosh', title: 'Macintosh', children: [], icon: LinkIcon},
            {id: 'granny-smith', title: 'Granny Smith', children: []},
            {id: 'fuji', title: 'Fuji', children: []},
          ],
        },
        {id: 'bananas', title: 'Bananas', children: []},
        {
          id: 'pears',
          title: 'Pears',
          children: [
            {id: 'anjou', title: 'Anjou', children: []},
            {id: 'bartlett', title: 'Bartlett', children: []},
            {id: 'bosc', title: 'Bosc', children: []},
            {id: 'concorde', title: 'Concorde', children: []},
            {id: 'seckel', title: 'Seckel', children: []},
            {id: 'starkrimson', title: 'Starkrimson', children: []},
          ],
        },
      ],
    },
    {
      id: 'vegetables',
      title: 'Vegetables',
      children: [
        {
          id: 'podded-vegetables',
          title: 'Podded vegetables',
          children: [
            {id: 'lentil', title: 'Lentil', children: []},
            {id: 'pea', title: 'Pea', children: []},
            {id: 'peanut', title: 'Peanut', children: []},
          ],
        },
        {
          id: 'bulb-and-stem-vegetables',
          title: 'Bulb and stem vegetables',
          children: [
            {id: 'asparagus', title: 'Asparagus', children: []},
            {id: 'celery', title: 'Celery', children: []},
            {id: 'leek', title: 'Leek', children: []},
            {id: 'onion', title: 'Onion', children: []},
          ],
        },
        {
          id: 'root-and-tuberous-vegetables',
          title: 'Root and tuberous vegetables',
          children: [
            {id: 'carrot', title: 'Carrot', children: []},
            {id: 'ginger', title: 'Ginger', children: []},
            {id: 'parsnip', title: 'Parsnip', children: []},
            {id: 'potato', title: 'Potato', children: []},
          ],
        },
      ],
    },
    {
      id: 'grains',
      title: 'Grains',
      children: [
        {
          id: 'cereal-grains',
          title: 'Cereal grains',
          children: [
            {id: 'barley', title: 'Barley', children: []},
            {id: 'oats', title: 'Oats', children: []},
            {id: 'rice', title: 'Rice', children: []},
          ],
        },
        {
          id: 'pseudocereal-grains',
          title: 'Pseudocereal grains',
          children: [
            {id: 'amaranth', title: 'Amaranth', children: []},
            {id: 'buckwheat', title: 'Buckwheat', children: []},
            {id: 'chia', title: 'Chia', children: []},
            {id: 'quinoa', title: 'Quinoa', children: []},
          ],
        },
        {
          id: 'oilseeds',
          title: 'Oilseeds',
          children: [
            {id: 'india-mustard', title: 'India mustard', children: []},
            {id: 'safflower', title: 'Safflower', children: []},
            {id: 'flax-seed', title: 'Flax seed', children: []},
            {id: 'poppy-seed', title: 'Poppy seed', children: []},
          ],
        },
      ],
    },
  ],
}

export default function BasicStory() {
  const {ref, Wrapper: PerfWrapper} = usePerfTest(perfTests[0])
  const [id, setId] = useState('vegetables')

  return (
    <Box padding={[4, 5, 6]}>
      <Box marginBottom={4}>
        <Text id="current-id" size={1} weight="semibold">
          id={id || '(none)'}
        </Text>
      </Box>

      <PerfWrapper>
        <Tree ref={ref} space={1}>
          {tree.children.map((child) => (
            <TreeItemView currentId={id} key={child.id} node={child} setId={setId} />
          ))}
        </Tree>
      </PerfWrapper>
    </Box>
  )
}

const TreeItemView = memo(function TreeItemView(props: {
  currentId: string
  node: NodeType
  setId: (id: string) => void
}) {
  const {currentId, node, setId} = props
  const isLeaf = node.children.length === 0

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()

      if (!isLeaf) {
        return
      }

      const testid = event.currentTarget.getAttribute('data-testid')

      if (testid) setId(testid)
    },
    [isLeaf, setId]
  )

  const children = useMemo(
    () =>
      isLeaf
        ? undefined
        : node.children.map((child) => (
            <TreeItemView currentId={currentId} key={child.id} node={child} setId={setId} />
          )),
    [currentId, isLeaf, node, setId]
  )

  return (
    <TreeItem
      id={node.id}
      icon={node.icon}
      onClick={handleClick}
      selected={currentId === node.id}
      text={node.title}
    >
      {children}
    </TreeItem>
  )
})
