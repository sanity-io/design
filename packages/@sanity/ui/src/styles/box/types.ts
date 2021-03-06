import {BoxDisplay, BoxHeight, BoxOverflow, BoxSizing} from '../../types'

/**
 * @internal
 */
export interface ResponsiveBoxStyleProps {
  $display?: BoxDisplay | BoxDisplay[]
  $height?: BoxHeight | BoxHeight[]
  $overflow?: BoxOverflow | BoxOverflow[]
  $sizing?: BoxSizing | BoxSizing[]
}
