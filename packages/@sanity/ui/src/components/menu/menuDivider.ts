import styled, {StyledComponent} from 'styled-components'
import {Theme} from '../../theme'

/**
 * @public
 */
export const MenuDivider: StyledComponent<'hr', {sanity: Theme}> = styled.hr`
  height: 1px;
  border: 0;
  background: var(--sanity-hairline-soft-color);
  margin: 0;
`
