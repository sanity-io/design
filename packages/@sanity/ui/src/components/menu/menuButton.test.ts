import {browser} from '$test'

describe('MenuButton', () => {
  it('clicking should open/close menu', async () => {
    const page = await browser.getPage('/components/menu/menu-button')
    const $menuButton = page.locator('#menu-button')
    const $nextButton = page.locator('#next-button')

    // click button
    await $menuButton.click()
    expect(await $menuButton.getAttribute('aria-expanded')).toBe('true')

    // click outside
    await $nextButton.click()
    expect(await $menuButton.getAttribute('aria-expanded')).toBe('false')
  })

  it('should use arrow keys to navigate the menu', async () => {
    const page = await browser.getPage('/components/menu/menu-button')
    const $menuButton = page.locator('#menu-button')
    const $menuItem1 = page.locator('#menu-item-1')
    const $menuItem2 = page.locator('#menu-item-2')
    const $menuItem4 = page.locator('#menu-item-4')

    // Open menu by pressed DOWN arrow key
    await $menuButton.focus()
    await page.keyboard.press('ArrowDown')
    await expect($menuItem1).toHaveFocus()
    // Move through menu with arrow keys
    await page.keyboard.press('ArrowDown')
    await expect($menuItem2).toHaveFocus()
    await page.keyboard.press('ArrowDown')
    // Skips #menu-item-3, because it's disabled
    await expect($menuItem4).toHaveFocus()
    await page.keyboard.press('ArrowDown')
    // The first menu item should now be focused
    await expect($menuItem1).toHaveFocus()
    // Escape to exit the menu
    await page.keyboard.press('Escape')
    await expect($menuButton).toHaveFocus()

    // Open menu by pressed UP arrow key
    await page.keyboard.press('ArrowUp')
    await expect($menuItem4).toHaveFocus()
    // Move through menu with arrow keys
    await page.keyboard.press('ArrowUp')
    // Skips #menu-item-3, because it's disabled
    await expect($menuItem2).toHaveFocus()
    await page.keyboard.press('ArrowUp')
    await expect($menuItem1).toHaveFocus()
    await page.keyboard.press('ArrowUp')
    // The last menu item should now be focused
    await expect($menuItem4).toHaveFocus()
    // Escape to exit the menu
    await page.keyboard.press('Escape')
    await expect($menuButton).toHaveFocus()
  })

  it('should close on `Tab`', async () => {
    const page = await browser.getPage('/components/menu/menu-button')
    const $menuButton = page.locator('#menu-button')
    const $nextButton = page.locator('#next-button')
    const $menuItem1 = page.locator('#menu-item-1')

    await $menuButton.focus()
    await page.keyboard.press('ArrowDown')
    await expect($menuItem1).toHaveFocus()
    await page.keyboard.press('Tab')
    expect(await $menuButton.getAttribute('aria-expanded')).toBe('false')
    await expect($nextButton).toHaveFocus()
  })

  it('should close on `Shift+Tab`', async () => {
    const page = await browser.getPage('/components/menu/menu-button')
    const $menuButton = page.locator('#menu-button')
    const $prevButton = page.locator('#prev-button')
    const $menuItem1 = page.locator('#menu-item-1')

    await $menuButton.focus()
    await page.keyboard.press('ArrowDown')
    await expect($menuItem1).toHaveFocus()
    await page.keyboard.press('Shift+Tab')
    expect(await $menuButton.getAttribute('aria-expanded')).toBe('false')
    await expect($prevButton).toHaveFocus()
  })

  it('should not close when one of the items receives focus', async () => {
    const page = await browser.getPage('/components/menu/menu-button')
    const $menuButton = page.locator('#menu-button')
    const $menuItem2 = page.locator('#menu-item-2')

    await $menuButton.click()
    await expect($menuButton).toHaveFocus()
    await $menuItem2.focus()
    expect(await $menuButton.getAttribute('aria-expanded')).toBe('true')
  })
})
