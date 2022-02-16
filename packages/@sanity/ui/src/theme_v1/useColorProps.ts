import {useContext, useMemo} from 'react'
import {ColorContext} from './ColorContext'
import {ColorProps, getColorProps} from './colorProps'
import {useTheme} from './useTheme'

export function useColorProps(props: {mode?: string; palette?: string; tone?: string}): {
  contextProps: ColorProps
  styleProps: ColorProps
} {
  const {mode, palette, tone} = props

  const theme = useTheme()

  const defaultColor: ColorProps = useMemo(
    () => ({
      mode: theme.color.mode,
      palette: theme.color.palette,
      tone: theme.color.tone,
    }),
    [theme]
  )

  const parentColor = useContext(ColorContext)

  const styleProps = useMemo(
    () => getColorProps(parentColor || {}, {mode, palette, tone}, theme),
    [parentColor, mode, palette, theme, tone]
  )

  return useMemo(
    () => ({contextProps: {...(parentColor || defaultColor), ...styleProps}, styleProps}),
    [parentColor, defaultColor, styleProps]
  )
}
