import {ColorHueKey, ColorTintKey, HSL, hues} from '@sanity/color'
import {useBoolean} from '@sanity/ui-workshop'
import {ReactElement, useCallback, useState} from 'react'
import {Stack, TextArea} from '../../../primitives'
import {ColorSwatchesEditor} from './ColorSwatchEditor'
import {ColorSwatch} from './types'

const colorPalette: {hue: ColorHueKey; swatches: ColorSwatch[]}[] = Object.entries(hues).map(
  ([hue, tints]) => {
    return {
      hue: hue as ColorHueKey,
      swatches: Object.entries(tints).map(([tint, color]) => {
        return {
          key: tint as ColorTintKey,
          hsl: color.hsl,
        }
      }),
    }
  }
)

export default function Tool(): ReactElement {
  const gray = useBoolean('Gray', true)
  const magenta = useBoolean('Magenta', true)
  const purple = useBoolean('Purple', true)
  const blue = useBoolean('Blue', true)
  const cyan = useBoolean('Cyan', true)
  const green = useBoolean('Green', true)
  const yellow = useBoolean('Yellow', true)
  const orange = useBoolean('Orange', true)
  const red = useBoolean('Red', true)

  const code = useBoolean('Show code', false)

  const [palette, setPalette] =
    useState<{hue: ColorHueKey; swatches: ColorSwatch[]}[]>(colorPalette)

  const updateSwatch = useCallback((hue: ColorHueKey, tint: ColorTintKey, hsl: HSL) => {
    setPalette((prev) => {
      return prev.map((t) => {
        if (t.hue === hue) {
          return {
            ...t,
            swatches: t.swatches.map((s) => {
              if (s.key === tint) {
                return {...s, hsl}
              }

              return s
            }),
          }
        }

        return t
      })
    })
  }, [])

  return (
    <>
      <Stack space={0}>
        {palette
          .filter((t) => (t.hue === 'gray' ? gray : true))
          .filter((t) => (t.hue === 'magenta' ? magenta : true))
          .filter((t) => (t.hue === 'purple' ? purple : true))
          .filter((t) => (t.hue === 'blue' ? blue : true))
          .filter((t) => (t.hue === 'cyan' ? cyan : true))
          .filter((t) => (t.hue === 'green' ? green : true))
          .filter((t) => (t.hue === 'yellow' ? yellow : true))
          .filter((t) => (t.hue === 'orange' ? orange : true))
          .filter((t) => (t.hue === 'red' ? red : true))
          .map((t) => (
            <ColorSwatchesEditor
              hue={t.hue}
              key={t.hue}
              swatches={t.swatches}
              updateSwatch={updateSwatch}
            />
          ))}
      </Stack>

      {code && (
        <TextArea border={false} fontSize={0} readOnly rows={30} value={compileCode(palette)} />
      )}
    </>
  )
}

function compileCode(palette: {hue: ColorHueKey; swatches: ColorSwatch[]}[]) {
  let code = ''

  for (const color of palette) {
    const {hue, swatches} = color
    const title = `${hue.slice(0, 1).toUpperCase()}${hue.slice(1)}`

    code += `/** @internal */\n`
    code += `export const ${hue}: ColorHueConfig = {\n`

    code += `  title: '${title}',\n`
    code += `  tints: {\n`

    for (const s of swatches) {
      code += `    ${s.key}: {\n`
      code += `      title: '${title} ${s.key}',\n`
      code += `      hsl: [${s.hsl[0]}, ${s.hsl[1]}, ${s.hsl[2]}],\n`
      code += `    },\n`
    }

    code += `  },\n`

    code += `}\n\n`
  }

  return code
}
