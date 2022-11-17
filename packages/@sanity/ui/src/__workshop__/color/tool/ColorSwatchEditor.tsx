import {ColorHueKey, ColorTintKey, HSL, hslToRgb, rgbToHex} from '@sanity/color'
import {getContrast} from 'polished'
import {memo, ReactElement, useCallback, useState} from 'react'
import {useElementSize} from '../../../hooks'
import {Card, Flex, Text} from '../../../primitives'
import {useTheme} from '../../../theme'
import {SLIDER_H} from './constants'
import {Slider} from './Slider'
import {ColorSwatch} from './types'

export const ColorSwatchesEditor = memo(function ColorSwatchesEditor(props: {
  hue: ColorHueKey
  swatches: ColorSwatch[]
  updateSwatch: (hue: ColorHueKey, tint: ColorTintKey, hsl: HSL) => void
}): ReactElement {
  const {hue, swatches, updateSwatch} = props
  const [expanded, setExpanded] = useState(false)
  const handleToggle = useCallback(() => setExpanded((prev) => !prev), [])

  const [wrapper, setWrapper] = useState<HTMLDivElement | null>(null)

  const _updateSwatch = useCallback(
    (tint: ColorTintKey, hsl: HSL) => {
      updateSwatch(hue, tint, hsl)
    },
    [hue, updateSwatch]
  )

  return (
    <div>
      <Flex onClick={handleToggle}>
        {swatches.map((t) => (
          <ColorPreview expanded={expanded} key={t.key} hsl={t.hsl} />
        ))}
      </Flex>
      <div hidden={!expanded} ref={setWrapper}>
        <Connectors swatches={swatches} wrapper={wrapper} />
        <Flex>
          {swatches.map((t) => (
            <SwatchSlider key={t.key} swatch={t} tint={t.key} updateSwatch={_updateSwatch} />
          ))}
        </Flex>
      </div>
    </div>
  )
})

const SwatchSlider = memo(function SwatchSlider(props: {
  swatch: ColorSwatch
  tint: ColorTintKey
  updateSwatch: (tint: ColorTintKey, hsl: HSL) => void
}) {
  const {tint, swatch, updateSwatch} = props

  const handleChange = useCallback((hsl: HSL) => updateSwatch(tint, hsl), [updateSwatch, tint])

  return <Slider onHSLChange={handleChange} value={swatch.hsl} />
})

function Connectors(props: {swatches: ColorSwatch[]; wrapper: HTMLDivElement | null}) {
  const {swatches, wrapper} = props
  const size = useElementSize(wrapper)
  const w = size?.border.width ?? 0
  const cellW = w / 11
  const H = cellW / 2

  return (
    <svg
      viewBox={`0 0 ${w} ${SLIDER_H + 12}`}
      height={SLIDER_H + 12}
      style={{
        position: 'absolute',
        display: 'block',
      }}
    >
      <path
        d={swatches
          .map((t, i) => {
            if (i === 0) {
              return `M${cellW * i + H},${(t.hsl[0] / 360) * SLIDER_H + 6}`
            }

            return `L${cellW * i + H},${(t.hsl[0] / 360) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke="red"
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            if (i === 0) {
              return `M${cellW * i + H},${(t.hsl[1] / 100) * SLIDER_H + 6}`
            }

            return `L${cellW * i + H},${(t.hsl[1] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke="green"
        fill="none"
      />

      <path
        d={swatches
          .map((t, i) => {
            if (i === 0) {
              return `M${cellW * i + H},${(t.hsl[2] / 100) * SLIDER_H + 6}`
            }

            return `L${cellW * i + H},${(t.hsl[2] / 100) * SLIDER_H + 6}`
          })
          .join(' ')}
        stroke="blue"
        fill="none"
      />
    </svg>
  )
}

const ColorPreview = memo(function ColorPreview(props: {expanded: boolean; hsl: HSL}) {
  const {expanded, hsl} = props
  const {color} = useTheme().sanity

  const hex = rgbToHex(hslToRgb(hsl))
  const contrast = getContrast(hex, color.dark ? '#111213' : '#ffffff')

  return (
    <Card
      flex={1}
      style={{
        height: expanded ? 200 : 50,
        backgroundColor: `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`,
      }}
    >
      <Text size={1} style={{opacity: 0.2}} weight="bold">
        {contrast}
      </Text>
    </Card>
  )
})
