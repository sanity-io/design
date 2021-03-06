import {
  GridAutoCols,
  GridAutoFlow,
  GridAutoRows,
  GridItemColumn,
  GridItemColumnEnd,
  GridItemColumnStart,
  GridItemRow,
  GridItemRowEnd,
  GridItemRowStart,
} from '../../types'

/**
 * @internal
 */
export interface ResponsiveGridStyleProps {
  $autoRows?: GridAutoRows | GridAutoRows[]
  $autoCols?: GridAutoCols | GridAutoCols[]
  $autoFlow?: GridAutoFlow | GridAutoFlow[]
  $columns?: number | number[]
  $gap?: number | number[]
  $gapX?: number | number[]
  $gapY?: number | number[]
  $rows?: number | number[]
}

/**
 * @internal
 */
export interface ResponsiveGridItemStyleProps {
  $column?: GridItemColumn | GridItemColumn[]
  $columnStart?: GridItemColumnStart | GridItemColumnStart[]
  $columnEnd?: GridItemColumnEnd | GridItemColumnEnd[]
  $row?: GridItemRow | GridItemRow[]
  $rowStart?: GridItemRowStart | GridItemRowStart[]
  $rowEnd?: GridItemRowEnd | GridItemRowEnd[]
}
