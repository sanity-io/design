import {browser} from '$test'

describe('Autocomplete', () => {
  it('should use key arrows', async () => {
    const page = await browser.getPage('/components/autocomplete/custom')
    const $input = page.locator('#custom')
    const $listbox = page.locator('#custom-listbox')

    // Fill input with "nor"
    await $input.fill('nor')

    // Input value is "nor"
    await expect($input).toMatchValue('nor')

    // The listbox is expanded
    expect(await $input.getAttribute('aria-expanded')).toBe('true')
    await $listbox.waitFor({state: 'visible'})

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // The 3rd option should be focused
    await expect($listbox.locator('[data-qa="option-NO"]')).toHaveFocus()

    // Escape to close listbox
    await page.keyboard.press('Escape')
    expect(await $input.getAttribute('aria-expanded')).toBe('false')

    // Input value is cleared
    await expect($input).toMatchValue('')
  })

  it('should press clear button to clear', async () => {
    const page = await browser.getPage('/components/autocomplete/custom')
    const $input = page.locator('#custom')
    const $listbox = page.locator('#custom-listbox')
    const $clearButton = page.locator('[data-qa="clear-button"]')

    // Fill input with "nor"
    await $input.fill('nor')

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // The 3rd option should be focused
    await expect($listbox.locator('[data-qa="option-NO"]')).toHaveFocus()

    // Enter to select
    await page.keyboard.press('Enter')

    // The input should focused
    await expect($input).toHaveFocus()
    await expect($input).toMatchValue('Norway')

    // Tab 1 time
    await page.keyboard.press('Tab')

    // Enter to clear
    await expect($clearButton).toHaveFocus()
    await page.keyboard.press('Enter')

    // The input should focused and empty
    await expect($input).toHaveFocus()
    await expect($input).toMatchValue('')
  })

  it('should collapse when tabbing out', async () => {
    const page = await browser.getPage('/components/autocomplete/custom')
    const $input = page.locator('#custom')

    // Search for "nor"
    await $input.fill('nor')

    // Should be expanded
    expect(await $input.getAttribute('aria-expanded')).toBe('true')

    // Tab 1 time
    await page.keyboard.press('Tab')

    // Should be collapsed
    expect(await $input.getAttribute('aria-expanded')).toBe('false')
  })

  it('should clear query on blur', async () => {
    const page = await browser.getPage('/components/autocomplete/custom')
    const $input = page.locator('#custom')
    const $listbox = page.locator('#custom-listbox')

    // Search for "nor"
    await $input.fill('nor')

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // The 3rd option should be focused
    await expect($listbox.locator('[data-qa="option-NO"]')).toHaveFocus()

    // Enter to select
    await page.keyboard.press('Enter')

    await expect($input).toMatchValue('Norway')
    await expect($input).toHaveFocus()

    // Search for "net"
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await $input.fill('net')
    await expect($input).toMatchValue('net')

    // Tab out of autocomplete
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Expect autocomplete to be collapsed
    expect(await $input.getAttribute('aria-expanded')).toBe('false')

    // Expect the value to be "Norway"
    await expect($input).toMatchValue('Norway')
  })

  it('should search anew after selecting a value', async () => {
    const page = await browser.getPage('/components/autocomplete/custom')
    const $input = page.locator('#custom')
    const $listbox = page.locator('#custom-listbox')

    // Search for "nor"
    await $input.fill('nor')

    // Arrow down 3 times
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('ArrowDown')

    // The 3rd option should be focused
    await expect($listbox.locator('[data-qa="option-NO"]')).toHaveFocus()

    // Enter to select
    await page.keyboard.press('Enter')

    await expect($input).toMatchValue('Norway')
    await expect($input).toHaveFocus()

    // Search for "net"
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await page.keyboard.press('Backspace')
    await $input.fill('net')
    await expect($input).toMatchValue('net')
    await expect($input).toHaveFocus()

    // Arrow down 1 time
    await page.keyboard.press('ArrowDown')

    // Enter to select
    await page.keyboard.press('Enter')

    // Expect autocomplete to be collapsed
    expect(await $input.getAttribute('aria-expanded')).toBe('false')

    // Expect "Netherlands" to be selected
    await expect($input).toMatchValue('Netherlands')
    await expect($input).toHaveFocus()
  })

  it('should trigger focus and blur', async () => {
    const page = await browser.getPage('/components/autocomplete/focus-and-blur')
    const $body = page.locator('body')
    const $input = page.locator('#focus-and-blur')
    const $log = page.locator('#focus-and-blur-log')
    const $clearBtn = page.locator('#focus-and-blur-clear-btn')

    // Click to focus
    await $input.click()
    await expect($log).toMatchText('["focus"]')

    // Click body to blur
    await $body.click()
    await expect($log).toMatchText('["focus","blur"]')

    // Clear log
    await $clearBtn.click()

    // Click to focus
    await $input.click()

    // Search for "foo"
    await $input.fill('foo')

    // Select "foo"
    await page.keyboard.press('ArrowDown')
    await expect(page.locator('#focus-and-blur-option-foo > div')).toHaveFocus()
    await page.locator('#focus-and-blur-option-foo > div').click()

    // Expect "foo" to be selected
    await expect($input).toMatchValue('foo')
    await expect($input).toHaveFocus()
    await expect($log).toMatchText('["focus"]')

    // Click body to blur
    await $body.click()
    await expect($log).toMatchText('["focus","blur"]')
  })
})
