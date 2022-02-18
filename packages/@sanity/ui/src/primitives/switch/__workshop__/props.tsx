import {Flex, Switch} from '@sanity/ui'
import {useBoolean, useNumber} from '@sanity/ui-workshop'
import React, {useCallback, useMemo} from 'react'
import {ThemeProvider} from 'styled-components'
import {Theme, useTheme} from '../../../theme'

export default function PropsStory() {
  const checked = useBoolean('Checked', false)
  const indeterminate = useBoolean('Indeterminate', false)
  const readOnly = useBoolean('Read only', false)
  const theme = useTheme()
  const focusRingOffset = useNumber('Focus ring offset', theme.focusRing.offset)
  const focusRingWidth = useNumber('Focus ring width', theme.focusRing.width)
  const handleChange = useCallback(() => undefined, [])

  const customTheme: {sanity: Theme} = useMemo(
    () => ({
      ...theme,
      sanity: {
        ...theme,
        focusRing: {
          offset: focusRingOffset || theme.focusRing.offset,
          width: focusRingWidth || theme.focusRing.width,
        },
      },
    }),
    [focusRingOffset, focusRingWidth, theme]
  )

  return (
    <ThemeProvider theme={customTheme}>
      <Flex align="center" height="fill" justify="center" padding={[4, 5, 6]} sizing="border">
        <Switch
          checked={checked}
          indeterminate={indeterminate}
          onChange={handleChange}
          readOnly={readOnly}
        />
      </Flex>
    </ThemeProvider>
  )
}
