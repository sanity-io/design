import {Card, studioTheme, ThemeColorSchemeKey, ThemeProvider} from '@sanity/ui'
import {
  render as tlRender,
  RenderOptions as TLRenderOptions,
  RenderResult,
} from '@testing-library/react'
import {Fragment, StrictMode} from 'react'

interface RenderOptions extends TLRenderOptions {
  scheme?: ThemeColorSchemeKey
  strict?: boolean
}

const DefaultWrapper: React.FC = ({children}: {children?: React.ReactNode}) => (
  <main>{children}</main>
)

export function render(
  element: React.ReactElement<any>,
  options: RenderOptions = {}
): RenderResult {
  const {
    baseElement,
    scheme = 'light',
    strict = false,
    wrapper: InnerWrapper = DefaultWrapper,
  } = options
  const ReactWrapper = strict ? StrictMode : Fragment

  const Wrapper: React.FC = ({children}: any) => {
    return (
      <ReactWrapper>
        <InnerWrapper>
          <ThemeProvider theme={studioTheme}>
            <Card padding={4} scheme={scheme}>
              {children}
            </Card>
          </ThemeProvider>
        </InnerWrapper>
      </ReactWrapper>
    )
  }

  const result = tlRender(element, {
    baseElement,
    wrapper: Wrapper,
  })

  return result
}
