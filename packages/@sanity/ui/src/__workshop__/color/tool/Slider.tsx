import {HSL} from '@sanity/color'
import {ReactElement, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {Stack, Text} from '../../../primitives'
import {SLIDER_H} from './constants'
import {useHandle} from './useHandle'

const Handle = styled.button`
  appearance: none;
  border: 0;
  position: absolute;
  background-color: #000;
  width: 12px;
  height: 12px;
  left: calc(50% - 6px);
  border-radius: 50%;
  margin: 0;
  padding: 0;

  &:focus {
    outline: 2px solid blue;
  }
`

export function Slider(props: {onHSLChange: (hsl: HSL) => void; value: HSL}): ReactElement {
  const {onHSLChange, value} = props
  const wrapperRef = useRef<HTMLDivElement>(null)

  const {
    ref: hRef,
    top: hTop,
    value: h,
  } = useHandle({propValue: value[0], wrapperRef, min: 0, max: 360})

  const {
    ref: sRef,
    top: sTop,
    value: s,
  } = useHandle({propValue: value[1], wrapperRef, min: 0, max: 100})

  const {
    ref: lRef,
    top: lTop,
    value: l,
  } = useHandle({propValue: value[2], wrapperRef, min: 0, max: 100})

  useEffect(() => onHSLChange([h, s, l]), [h, s, l, onHSLChange])

  return (
    <div style={{flex: 1}}>
      <div
        ref={wrapperRef}
        style={{
          position: 'relative',
          height: SLIDER_H + 12,
        }}
      >
        <Handle ref={hRef} style={{backgroundColor: 'red', top: hTop}} />
        <Handle ref={sRef} style={{backgroundColor: 'green', top: sTop}} />
        <Handle ref={lRef} style={{backgroundColor: 'blue', top: lTop}} />
      </div>
      <Stack padding={3} space={2} style={{borderTop: '1px solid var(--card-border-color)'}}>
        <Text align="center">H: {value[0]}</Text>
        <Text align="center">S: {value[1]}</Text>
        <Text align="center">L: {value[2]}</Text>
      </Stack>
    </div>
  )
}
