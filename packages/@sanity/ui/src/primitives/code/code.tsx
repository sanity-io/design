import {forwardRef} from 'react'
import Refractor from 'react-refractor'
import styled from 'styled-components'
import {responsiveCodeFontStyle, ResponsiveFontStyleProps} from '../../styles/internal'
import {useTheme} from '../../theme'
import {useSize} from '../../utils'
import {codeBaseStyle} from './styles'

/**
 * @public
 */
export interface CodeProps {
  as?: React.ElementType | keyof JSX.IntrinsicElements
  language?: string
  size?: number | number[]
  weight?: string
}

const Root = styled.pre<ResponsiveFontStyleProps>(codeBaseStyle, responsiveCodeFontStyle)

function useCodeSize(size?: number | number[]) {
  const {fonts} = useTheme().sanity

  return useSize({
    max: fonts.code.sizes.length,
    size,
  })
}

/**
 * @public
 */
export const Code = forwardRef(function Code(
  props: CodeProps & Omit<React.HTMLProps<HTMLElement>, 'as' | 'size'>,
  ref: React.ForwardedRef<HTMLElement>
) {
  const {children, language: languageProp, size = 2, weight, ...restProps} = props

  const $size = useCodeSize(size)

  const language = typeof languageProp === 'string' ? languageProp : undefined
  const registered = language ? Refractor.hasLanguage(language as any) : false

  return (
    <Root data-ui="Code" {...restProps} $size={$size} $weight={weight} ref={ref}>
      {!(language && registered) && <code>{children}</code>}
      {language && registered && <Refractor inline language={language} value={String(children)} />}
    </Root>
  )
})
