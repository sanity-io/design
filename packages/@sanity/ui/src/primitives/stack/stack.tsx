import {forwardRef, memo} from 'react'
import {useArrayProp} from '../../hooks'
import {compose} from '../../styles'
import {Box, BoxProps} from '../box'
import {stackBaseStyle, responsiveStackSpaceStyle, ResponsiveStackSpaceStyleProps} from './styles'

/**
 * @public
 */
export interface StackProps extends BoxProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  space?: number | number[]
}

const Root = memo(
  compose<ResponsiveStackSpaceStyleProps>(Box, [stackBaseStyle, responsiveStackSpaceStyle])
)

/**
 * @public
 */
export const Stack = forwardRef(function Stack(
  props: StackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {as, space, ...restProps} = props

  return (
    <Root
      data-as={typeof as === 'string' ? as : undefined}
      data-ui="Stack"
      {...restProps}
      $space={useArrayProp(space)}
      forwardedAs={as}
      ref={ref}
    />
  )
})
