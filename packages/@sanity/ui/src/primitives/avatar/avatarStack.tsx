import {cloneElement, forwardRef, memo} from 'react'
import {CSSObject} from 'styled-components'
import {EMPTY_RECORD} from '../../constants'
import {useArrayProp} from '../../hooks'
import {rem, _responsive, ThemeProps, compose} from '../../styles'
import {AvatarSize} from '../../types'
import {childrenToElementArray} from '../helpers'
import {AvatarCounter} from './avatarCounter'

const BASE_STYLES: CSSObject = {
  whiteSpace: 'nowrap',

  '& > div': {
    verticalAlign: 'top',

    '&:not([hidden])': {
      display: 'inline-block',
    },
  },
}

function responsiveAvatarStackSizeStyle(props: {$size: AvatarSize[]} & ThemeProps) {
  const {theme} = props
  const {avatar, media} = theme.sanity

  return _responsive(media, props.$size, (size) => {
    const avatarSize = avatar.sizes[size]

    if (!avatarSize) return EMPTY_RECORD

    return {
      '& > div + div': {
        marginLeft: rem(avatarSize.distance),
      },
    }
  })
}

const Root = memo(
  compose<{$size: AvatarSize[]}>('div', [responsiveAvatarStackSizeStyle, BASE_STYLES])
)

/**
 * @public
 */
export interface AvatarStackProps {
  children: React.ReactNode
  maxLength?: number
  size?: AvatarSize | AvatarSize[]
  /** @deprecated No longer supported. */
  tone?: 'navbar'
}

/**
 * @public
 */
export const AvatarStack = forwardRef(function AvatarStack(
  props: AvatarStackProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'ref'>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const {
    children: childrenProp,
    maxLength: maxLengthProp = 4,
    size: sizeProp = 0,
    ...restProps
  } = props
  const children = childrenToElementArray(childrenProp).filter(
    (child) => typeof child !== 'string'
  ) as React.ReactElement[]
  const maxLength = Math.max(maxLengthProp, 0)
  const size = useArrayProp(sizeProp)

  const len = children.length
  const visibleCount = maxLength - 1
  const extraCount = len - visibleCount
  const visibleChildren = extraCount > 1 ? children.slice(extraCount, len) : children

  return (
    <Root data-ui="AvatarStack" {...restProps} ref={ref} $size={size}>
      {len === 0 && (
        <div>
          <AvatarCounter count={len} />
        </div>
      )}

      {len !== 0 && extraCount > 1 && (
        <div>
          <AvatarCounter count={extraCount} size={size} />
        </div>
      )}

      {visibleChildren.map((child, childIndex) => (
        <div key={String(childIndex)}>{cloneElement(child, {size})}</div>
      ))}
    </Root>
  )
})
