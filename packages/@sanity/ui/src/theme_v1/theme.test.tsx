import {render, screen} from '@testing-library/react'
import React, {useContext} from 'react'
import {Box} from './Box'
import {ColorContext} from './ColorContext'
import {getColorProps} from './colorProps'
import {ThemeProvider} from './ThemeProvider'
import {theme} from './themes/studio'

function DebugColor(props: Omit<React.HTMLProps<HTMLPreElement>, 'children'>) {
  const color = useContext(ColorContext)

  return <pre {...props}>{JSON.stringify(color)}</pre>
}

describe('theme v1', () => {
  // it.skip('should …', () => {
  //   console.log(studioTheme.color.state('enabled', {tone: 'primary'}))
  // })

  it('...', () => {
    const parent = {palette: 'default', tone: 'default', mode: 'default'}

    expect(getColorProps(parent, {})).toEqual({})
    expect(getColorProps(parent, {palette: 'default'})).toEqual({})
    expect(getColorProps(parent, {palette: 'brand'})).toEqual({palette: 'brand'})
  })

  it.skip('...', () => {
    render(
      <ThemeProvider theme={theme}>
        <Box data-testid="outer">
          <DebugColor data-testid="outer-debug" />
          <Box data-testid="inner" tone="positive">
            <DebugColor data-testid="inner-debug" />
          </Box>
        </Box>
      </ThemeProvider>
    )

    // outer
    const outerBox = screen.getByTestId('outer')
    const outerDebug = screen.getByTestId('outer-debug')

    expect(outerBox).toHaveAttribute('data-mode', 'default')
    expect(outerBox).toHaveAttribute('data-palette', 'default')
    expect(outerBox).toHaveAttribute('data-tone', 'default')
    expect(outerDebug).toHaveTextContent('{"mode":"default","palette":"default","tone":"default"}')

    // inner
    const innerBox = screen.getByTestId('inner')
    const innerDebug = screen.getByTestId('inner-debug')

    expect(innerBox).not.toHaveAttribute('data-mode', 'default')
    expect(innerBox).not.toHaveAttribute('data-palette', 'default')
    expect(innerBox).toHaveAttribute('data-tone', 'positive')
    expect(innerDebug).toHaveTextContent('{"mode":"default","palette":"default","tone":"positive"}')
  })
})
