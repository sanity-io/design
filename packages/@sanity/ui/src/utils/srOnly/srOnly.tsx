import React, {forwardRef} from 'react'
import styled from 'styled-components'
import {AsProperty} from '../../types'

/**
 * @public
 */
export interface SrOnlyProps {
  as?: AsProperty
  children?: React.ReactNode
}

const Root = styled.div`
  display: block;
  width: 0;
  height: 0;
  position: absolute;
  overflow: hidden;
`

/**
 * @public
 */
export const SrOnly = forwardRef(function SrOnly(
  props: SrOnlyProps & Omit<React.HTMLProps<HTMLDivElement>, 'aria-hidden' | 'as'>,
  ref: React.Ref<HTMLDivElement>
) {
  const {as, children} = props

  return (
    <Root aria-hidden as={as} data-ui="SrOnly" ref={ref}>
      {children}
    </Root>
  )
})
