import {ReactElement, ReactNode} from 'react'
import {SizeContext} from './sizeContext'
import {useSize} from './useSize'

export function Size(props: {delta?: number; children?: ReactNode}): ReactElement {
  const {delta, children} = props
  const size = useSize({size: delta})

  return <SizeContext.Provider value={size}>{children}</SizeContext.Provider>
}
