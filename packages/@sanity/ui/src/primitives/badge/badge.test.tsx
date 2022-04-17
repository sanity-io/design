import {axe} from 'jest-axe'
import {Badge} from './badge'
import {render} from '$test'

describe('atoms/badge', () => {
  it('should have no violations (axe)', async () => {
    const lightResult = render(<Badge tone="positive">Label</Badge>, {scheme: 'light'})
    const darkResult = render(<Badge tone="positive">Label</Badge>, {scheme: 'dark'})

    expect(await axe(lightResult.container.outerHTML)).toHaveNoViolations()
    expect(await axe(darkResult.container.outerHTML)).toHaveNoViolations()
  })
})
