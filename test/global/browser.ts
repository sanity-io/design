import {Browser, chromium, Page} from 'playwright'
import {port} from './state'

globalThis.setImmediate = globalThis.setTimeout as any

function createTestBrowser() {
  let _browser: Browser
  let _pages: Page[] = []

  return {
    async close() {
      await _browser.close()
    },

    async closePages() {
      await Promise.all(_pages.map((page) => page.close()))
      _pages = []
    },

    async getPage(
      path: string,
      opts: {viewport?: {width: number; height: number}} = {}
    ): Promise<Page> {
      const page = await _browser.newPage()
      const url = `http://localhost:${port}/frame/?path=${path}`

      if (opts.viewport) {
        page.setViewportSize(opts.viewport)
      }

      await page.goto(url)
      // await page.locator('[data-testid="workshop"]').waitFor({state: 'visible'})

      _pages.push(page)

      return page
    },

    async start() {
      _browser = await chromium.launch()
    },
  }
}

export const browser = createTestBrowser()

beforeAll(async () => {
  await browser.start()
})

afterEach(async () => {
  await browser.closePages()
})

afterAll(async () => {
  await browser.close()
})
