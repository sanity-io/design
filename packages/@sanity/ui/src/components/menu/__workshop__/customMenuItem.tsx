import {Box, Card, Stack, Text} from '../../../primitives'
import {LayerProvider} from '../../../utils'
import {Menu} from '../menu'
import {MenuDivider} from '../menuDivider'
import {MenuItem} from '../menuItem'

export default function CustomMenuItemStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Card radius={3} shadow={2}>
        <LayerProvider>
          <Menu>
            <MenuItem padding={3}>
              <Stack space={3}>
                <Text weight="semibold">First option</Text>
                <Text muted size={1}>
                  Description
                </Text>
              </Stack>
            </MenuItem>
            <MenuItem padding={3}>
              <Stack space={3}>
                <Text weight="semibold">Second option</Text>
                <Text muted size={1}>
                  Description
                </Text>
              </Stack>
            </MenuItem>
            <MenuDivider />
            <MenuItem padding={3} tone="critical">
              <Stack space={3}>
                <Text weight="semibold">Dangerous option</Text>
                <Text muted size={1}>
                  Description
                </Text>
              </Stack>
            </MenuItem>
          </Menu>
        </LayerProvider>
      </Card>
    </Box>
  )
}
