import {isArray} from '../helpers'

export function addResponsiveProp(a: number | number[], b: number | number[]): number[] {
  const _a = isArray(a) ? a : [a]
  const _b = isArray(b) ? b : [b]

  const len = Math.max(_a.length, _b.length)
  const ret: number[] = []

  for (let i = 0; i < len; i += 1) {
    ret.push(_a[Math.min(i, _a.length - 1)] + _b[Math.min(i, _b.length - 1)])
  }

  return ret
}
