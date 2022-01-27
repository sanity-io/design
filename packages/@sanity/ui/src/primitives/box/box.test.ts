import {browser} from '$test'

describe('Box', () => {
  it('resizing window should hide and show responsive elements', async () => {
    const sizes = [
      {viewport: [320, 600], css: {display: 'none', flex: '1 1 0%', boxSizing: 'content-box'}},
      {viewport: [360, 600], css: {display: 'block', flex: '2 1 0%', boxSizing: 'border-box'}},
      {viewport: [600, 600], css: {display: 'none', flex: '3 1 0%', boxSizing: 'content-box'}},
      {viewport: [900, 600], css: {display: 'block', flex: '4 1 0%', boxSizing: 'border-box'}},
      {viewport: [1200, 600], css: {display: 'none', flex: '5 1 0%', boxSizing: 'content-box'}},
      {viewport: [1800, 600], css: {display: 'block', flex: '6 1 0%', boxSizing: 'border-box'}},
      {viewport: [2400, 600], css: {display: 'none', flex: '7 1 0%', boxSizing: 'content-box'}},
    ]

    for (const size of sizes) {
      const {css, viewport} = size
      const page = await browser.getPage('/primitives/box/responsive', {
        viewport: {width: viewport[0], height: viewport[1]},
      })
      const $box = page.locator('#responsive-box')
      const style = await $box.evaluate((el) => getComputedStyle(el))

      expect(style.display).toBe(css.display)
      expect(style.flex).toBe(css.flex)
      expect(style.boxSizing).toBe(css.boxSizing)
    }
  })
})
