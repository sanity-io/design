import {Placement as PopperPlacement} from '@popperjs/core'

/**
 * @public
 */
export type AsProperty = React.ElementType | React.ComponentType<any>
// export type AsProperty = string | React.ComponentType<any>

/**
 * @public
 */
export type TextAlign = 'left' | 'right' | 'center' | 'justify' | 'initial'

/**
 * A re-export of Popper’s `Placement` type
 * @public
 */
export type Placement = PopperPlacement
