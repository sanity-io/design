import {browser} from '$test'

describe('Tree', () => {
  describe('Browser tests', () => {
    it('should …', async () => {
      const page = await browser.getPage('/components/tree/basic')
      const $item_0_1 = page.locator('#item-0-1')
      const $item_0_2 = page.locator('#item-0-2')

      await $item_0_1.focus()

      await page.keyboard.press('ArrowDown')

      await expect($item_0_2).toHaveFocus()

      await page.keyboard.press('ArrowRight')

      expect(await $item_0_2.getAttribute('aria-expanded')).toBe('true')

      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('ArrowDown')

      await page.keyboard.press('ArrowLeft')
      await page.keyboard.press('ArrowLeft')

      expect(await $item_0_2.getAttribute('aria-expanded')).toBe('false')
    })
  })
})
