import {browser} from '$test'

describe('TextInput', () => {
  it('read-only input should have focus styling', async () => {
    const page = await browser.getPage('/primitives/text-input/read-only')
    const $textInput = page.locator('#text-input-example')
    const $textInputSpan = page.locator('#text-input-example + span')

    await $textInput.click()

    const style = await $textInputSpan.evaluate((el) => getComputedStyle(el))

    expect(style.boxShadow).toBe(
      'rgb(206, 210, 217) 0px 0px 0px 1px inset, rgb(242, 243, 245) 0px 0px 0px 1px, rgb(34, 118, 252) 0px 0px 0px 3px'
    )
  })
})
