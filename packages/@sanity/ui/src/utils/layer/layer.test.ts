import {browser} from '$test'

describe('Layer', () => {
  it('should support responsize z-offset', async () => {
    const sizes = [
      {viewport: [320, 600], css: {zIndex: '1'}},
      {viewport: [360, 600], css: {zIndex: '2'}},
      {viewport: [600, 600], css: {zIndex: '3'}},
      {viewport: [900, 600], css: {zIndex: '4'}},
      {viewport: [1200, 600], css: {zIndex: '5'}},
      {viewport: [1800, 600], css: {zIndex: '6'}},
      {viewport: [2400, 600], css: {zIndex: '7'}},
    ]

    for (const size of sizes) {
      const {css, viewport} = size

      const page = await browser.getPage('/utils/layer/responsive-z-offset', {
        viewport: {width: viewport[0], height: viewport[1]},
      })

      const style = await page.locator('#responsive-layer').evaluate((el) => getComputedStyle(el))

      expect(style.zIndex).toBe(css.zIndex)
    }
  })
})
