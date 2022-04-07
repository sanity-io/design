import React from 'react'
import {Box, Button, Stack} from '../../../primitives'
import {Menu} from '../menu'
import {MenuButton} from '../menuButton'
import {MenuDivider} from '../menuDivider'
import {MenuItem} from '../menuItem'

export default function NestedMenuItems() {
  return (
    <Box padding={[4, 5, 6]}>
      <MenuButton
        button={<Button text="Open" />}
        id="nested-example"
        menu={
          <Menu>
            <Stack space={1}>
              <MenuItem text="Item 1" />
              <MenuItem text="Item 2" />
            </Stack>
            <MenuDivider />
            <MenuItem text="Item 3" />
          </Menu>
        }
      />
    </Box>
  )
}
