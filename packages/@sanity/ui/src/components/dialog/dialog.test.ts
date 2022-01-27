import {browser} from '$test'

describe('Dialog', () => {
  it('should open dialog', async () => {
    const page = await browser.getPage('/components/dialog/props')
    const $openButton = page.locator('#open-dialog-button')
    const $dialog = page.locator('#dialog')

    await $openButton.click()
    await $dialog.waitFor({state: 'visible'})
  })

  it('should trap focus', async () => {
    const page = await browser.getPage('/components/dialog/props')
    const $openButton = page.locator('#open-dialog-button')
    const $dialog = page.locator('#dialog')
    const $closeButton = $dialog.locator('button[aria-label="Close dialog"]')
    const $button1 = page.locator('#button-1')
    const $button2 = page.locator('#button-2')
    const $button3 = page.locator('#button-3')
    const $button4 = page.locator('#button-4')
    const $button5 = page.locator('#button-5')

    // Press enter to open the dialog
    await $openButton.click()
    await $dialog.waitFor({state: 'visible'})

    // The close button should have focus initially
    await expect($closeButton).toHaveFocus()

    // Tab until the focus is back at the top
    await page.keyboard.press('Tab')
    await expect($button1).toHaveFocus()
    await page.keyboard.press('Tab')
    await expect($button2).toHaveFocus()
    await page.keyboard.press('Tab')
    await expect($button3).toHaveFocus()
    await page.keyboard.press('Tab')
    await expect($button4).toHaveFocus()
    await page.keyboard.press('Tab')
    await expect($button5).toHaveFocus()
    await page.keyboard.press('Tab')
    await expect($closeButton).toHaveFocus()
    await page.keyboard.press('Tab')
    await expect($button1).toHaveFocus()
  })
})
