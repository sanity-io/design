import {browser} from '$test'

describe('Tab', () => {
  it('should use keys to navigate tabs', async () => {
    const page = await browser.getPage('/components/tab/example')
    const $fooTab = page.locator('#example-tab-foo')
    const $barTab = page.locator('#example-tab-bar')
    const $fooPanel = page.locator('#example-panel-foo')

    await $fooTab.click()
    await page.keyboard.press('ArrowRight')
    await expect($barTab).toHaveFocus()
    await page.keyboard.press('ArrowRight')
    await page.keyboard.press('ArrowRight')
    await expect($fooTab).toHaveFocus()

    // Press "Tab"
    await page.keyboard.press('Tab')

    // Expect the panel to be focus
    await expect($fooPanel).toHaveFocus()
  })
})
