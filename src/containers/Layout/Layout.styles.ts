import styled from 'styled-components'
import { media } from '../../theme/media'

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 120px 40px 0;

  ${media.mobile} {
    padding: 100px 20px 0;
  }
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
`
