import {browser} from '$test'

describe('Grid', () => {
  it('should have responsive styles', async () => {
    const sizes = [
      {
        viewport: [320, 600],
        css: {
          gridGap: 'normal normal',
          gridTemplateColumns: '280px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px 11px 11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [360, 375],
        css: {
          gridGap: '4px 4px',
          gridTemplateColumns: '146px 146px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [600, 768],
        css: {
          gridGap: '8px 8px',
          gridTemplateColumns: '160px 160px 160px',
          gridTemplateRows: '11px 11px 11px 11px',
        },
      },

      {
        viewport: [900, 1024],
        css: {
          gridGap: '12px 12px',
          gridTemplateColumns: '190px 190px 190px 190px',
          gridTemplateRows: '11px 11px 11px 11px',
        },
      },

      {
        viewport: [1200, 1600],
        css: {
          gridGap: '20px 20px',
          gridTemplateColumns: '203.188px 203.203px 203.203px 203.203px 203.203px',
          gridTemplateRows: '11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [1800, 1920],
        css: {
          gridGap: '32px 32px',
          gridTemplateColumns: '256px 256px 256px 256px 256px 256px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px',
        },
      },

      {
        viewport: [2400, 3840],
        css: {
          gridGap: '52px 52px',
          gridTemplateColumns:
            '283.422px 283.422px 283.438px 283.422px 283.438px 283.422px 283.438px',
          gridTemplateRows: '11px 11px 11px 11px 11px 11px 11px',
        },
      },
    ]

    for (const size of sizes) {
      const {css, viewport} = size

      const page = await browser.getPage('/primitives/grid/responsive', {
        viewport: {width: viewport[0], height: viewport[1]},
      })

      const style = await page.locator('#responsive-grid').evaluate((el) => getComputedStyle(el))

      expect(style.gridGap).toBe(css.gridGap)
      expect(style.gridTemplateColumns).toBe(css.gridTemplateColumns)
      expect(style.gridTemplateRows).toBe(css.gridTemplateRows)
    }
  })
})
