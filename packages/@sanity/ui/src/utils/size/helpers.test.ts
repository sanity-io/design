import {addResponsiveProp} from './helpers'

it('should add size props', () => {
  expect(addResponsiveProp(0, [1, 2])).toEqual([1, 2])
  expect(addResponsiveProp([1], [1, 2])).toEqual([2, 3])
  expect(addResponsiveProp([1, 2], [1])).toEqual([2, 3])
})
