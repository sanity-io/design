import {browser} from '$test'

describe('Tree', () => {
  describe('Browser tests', () => {
    it('should …', async () => {
      const page = await browser.getPage('/components/tree/basic')
      const $vegetables = page.locator('#vegetables')
      const $grains = page.locator('#grains')

      await $vegetables.focus()

      await expect($vegetables).toHaveFocus()

      await page.keyboard.press('ArrowDown')

      await expect($grains).toHaveFocus()

      await page.keyboard.press('ArrowRight')

      expect(await $grains.getAttribute('aria-expanded')).toBe('true')

      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('ArrowDown')

      await page.keyboard.press('ArrowLeft')
      await page.keyboard.press('ArrowLeft')

      expect(await $grains.getAttribute('aria-expanded')).toBe('false')
    })
  })
})
