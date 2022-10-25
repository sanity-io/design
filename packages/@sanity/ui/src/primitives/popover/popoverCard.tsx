import {Strategy} from '@floating-ui/react-dom'
import React, {CSSProperties, forwardRef, memo, useMemo} from 'react'
import styled, {CSSObject} from 'styled-components'
import {FLOATING_STATIC_SIDES} from '../../constants'
// import {ThemeProps} from '../../styles'
import {ThemeColorSchemeKey} from '../../theme'
import {BoxOverflow, CardTone, Placement, PopoverMargins} from '../../types'
import {useLayer} from '../../utils'
import {Card} from '../card'
import {Container} from '../container'
import {
  DEFAULT_POPOVER_ARROW_WIDTH,
  DEFAULT_POPOVER_MARGINS,
  // DEFAULT_POPOVER_PADDING,
} from './constants'
import {PopoverArrow} from './popoverArrow'

function popoverCardStyle(): CSSObject {
  // props: {$boundaryHeight?: number; $boundaryWidth?: number} & ThemeProps
  // const {$boundaryHeight, $boundaryWidth} = props

  return {
    // maxWidth:
    //   typeof $boundaryWidth === 'number'
    //     ? `${$boundaryWidth - DEFAULT_POPOVER_PADDING * 2}px`
    //     : `calc(100% - ${DEFAULT_POPOVER_PADDING * 2}px)`,

    // maxHeight:
    //   typeof $boundaryHeight === 'number'
    //     ? `${$boundaryHeight - DEFAULT_POPOVER_PADDING * 2}px`
    //     : `calc(100% - ${DEFAULT_POPOVER_PADDING * 2}px)`,

    '&:not([hidden])': {
      display: 'flex',
    },

    flexDirection: 'column',

    width: 'max-content',
    minWidth: 'min-content',

    height: 'max-content',
    minHeight: 'min-content',
  }
}

const Root = memo(styled(Card)(popoverCardStyle))

/**
 * @internal
 */
export const PopoverCard = memo(
  forwardRef(function PopoverCard(
    props: {
      /** @beta*/
      __unstable_margins?: PopoverMargins
      arrow: boolean
      arrowRef: React.Ref<HTMLDivElement>
      arrowX?: number
      arrowY?: number
      availableHeight?: number
      availableWidth?: number
      // boundaryWidth?: number
      overflow?: BoxOverflow
      padding?: number | number[]
      placement?: Placement
      radius?: number | number[]
      referenceWidth?: number
      scheme?: ThemeColorSchemeKey
      shadow?: number | number[]
      strategy: Strategy
      tone: CardTone
      width?: number | 'auto' | (number | 'auto')[]
      x: number | null
      y: number | null
    } & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'height' | 'width'>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) {
    const {
      __unstable_margins: marginsProp,
      arrow,
      arrowRef,
      arrowX,
      arrowY,
      availableHeight,
      availableWidth,
      // boundaryWidth,
      children,
      padding,
      placement,
      overflow,
      radius,
      referenceWidth: referenceWidthProp,
      scheme,
      shadow,
      strategy,
      style,
      tone,
      width = 'auto',
      x: xProp,
      y: yProp,
      ...restProps
    } = props

    const {zIndex} = useLayer()

    // Get margins: [top, right, bottom, left]
    const margins: PopoverMargins = useMemo(
      () => marginsProp || DEFAULT_POPOVER_MARGINS,
      [marginsProp]
    )

    // Translate according to margins
    const referenceWidth = referenceWidthProp
      ? referenceWidthProp - margins[1] - margins[3]
      : undefined

    const x = (xProp ?? 0) + margins[3]
    const y = (yProp ?? 0) + margins[0]

    const rootStyle: CSSProperties = useMemo(
      () => ({
        position: strategy,
        top: y,
        left: x,
        zIndex,
        width: referenceWidth,
        maxWidth: availableWidth,
        maxHeight: availableHeight,
        ...style,
      }),
      [availableHeight, availableWidth, referenceWidth, strategy, style, x, y, zIndex]
    )

    const staticSide = placement && FLOATING_STATIC_SIDES[placement.split('-')[0]]

    const arrowStyle: CSSProperties = useMemo(() => {
      const style: CSSProperties = {
        left: arrowX !== null ? arrowX : undefined,
        top: arrowY !== null ? arrowY : undefined,
        right: undefined,
        bottom: undefined,
      }

      if (staticSide) style[staticSide] = 0 - DEFAULT_POPOVER_ARROW_WIDTH

      return style
    }, [arrowX, arrowY, staticSide])

    return (
      <Root
        {...restProps}
        // $boundaryWidth={boundaryWidth}
        data-placement={placement}
        data-ui="Popover"
        radius={radius}
        ref={ref}
        scheme={scheme}
        shadow={shadow}
        style={rootStyle}
        tone={tone}
      >
        <Container
          data-ui="Popover__wrapper"
          flex={1}
          overflow={overflow}
          padding={padding}
          sizing="border"
          width={width}
        >
          {children}
        </Container>

        {arrow && <PopoverArrow ref={arrowRef} style={arrowStyle} />}
      </Root>
    )
  })
)

PopoverCard.displayName = 'PopoverCard'
