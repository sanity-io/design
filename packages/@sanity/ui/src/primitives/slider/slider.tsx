import React from 'react'
import styled, {css} from 'styled-components'
import {Card} from '../card'

const STROKE_WIDTH = 2

const HANDLE_SIZE = 18

const Root = styled(Card)`
  position: relative;
`

const Input = styled.input`
  position: absolute;
  appearance: none;
  background: transparent;
  width: 100%;
  height: ${STROKE_WIDTH}px;
  margin: 0;
  visibility: none;
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    width: ${HANDLE_SIZE}px;
    height: ${HANDLE_SIZE}px;
    border-radius: ${HANDLE_SIZE / 2}px;
    /* background: #000; */
  }
`

const Presentation = styled.div(({theme}) => {
  const {color} = theme.sanity

  return css`
    position: relative;
    height: ${STROKE_WIDTH}px;
    pointer-events: none;
    /* opacity: 0.5; */

    & > [data-bg] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: ${color.input.default.enabled.border};
      border-radius: ${STROKE_WIDTH / 2}px;
      overflow: hidden;

      & > [data-selected] {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: ${color.base.focusRing};
        transition: transform 50ms;
      }
    }

    & > [data-handle] {
      position: absolute;
      left: 0;
      top: ${(STROKE_WIDTH - HANDLE_SIZE) / 2}px;
      width: calc(100% - ${HANDLE_SIZE}px);
      transition: transform 50ms;

      & > div {
        width: ${HANDLE_SIZE}px;
        height: ${HANDLE_SIZE}px;
        box-sizing: border-box;
        background: ${color.input.default.enabled.bg};
        border-radius: ${HANDLE_SIZE / 2}px;
        box-shadow: 0 0 0 1px ${color.base.shadow.outline};
      }
    }

    input:focus + & > [data-handle] {
      & > div {
        box-shadow: 0 0 0 1px ${color.base.shadow.outline}, 0 0 0 2px var(--card-focus-ring-color);
      }
    }
  `
})

/** @alpha */
export interface SliderProps {
  max?: number
  min?: number
  value?: number
}

/** @alpha */
export function SliderInput(
  props: SliderProps &
    Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'children' | 'height' | 'min' | 'ref'>
): React.ReactElement {
  const {max = 0, min = 0, step, value: valueProp, ...restProps} = props
  const value = valueProp ?? min
  const length = Math.abs(min - max)
  const progress = ((value - min) / length) * 100

  return (
    <Root radius={5}>
      <Input {...restProps} max={max} min={min} step={step} type="range" />
      <Presentation>
        <div data-bg="">
          <div data-selected="" style={{transform: `translate3d(${progress - 100}%, 0, 0)`}} />
        </div>
        <div data-handle="" style={{transform: `translate3d(${progress}%, 0, 0)`}}>
          <div />
        </div>
      </Presentation>
    </Root>
  )
}
