/* eslint-disable @typescript-eslint/ban-types */

import {StyleFunction} from 'styled-components/dist/types'
import {Theme} from '../theme'

/** @internal */
export interface ThemeProps {
  theme: Theme
}

export interface Dict<T> {
  [key: string]: T
}

/** @internal */
export interface StyledObject<Props extends object> {
  [key: string]:
    | Dict<any>
    | string
    | number
    | StyleFunction<Props>
    | StyledObject<Props>
    | undefined
}

/** @internal */
export interface CSSObject<T extends {} = {}> extends StyledObject<T> {
  // intentionally empty
}

/** @internal */
export type FlattenSimpleInterpolation = any
