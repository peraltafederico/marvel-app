import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Container = styled.div`
  display: flex;
  height: 85px;
  margin: 10px 0;
`

export const CoverPage = styled.div`
  width: 75px;
  margin-right: 10px;
`

export const Image = styled.img`
  width: inherit;
  height: 100%;
  border-radius: 5px;
`

export const Content = styled.div`
  flex: 1;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
`

export const Title = styled.h5`
  margin: 0 5px 0 0;
`

export const StarIcon = styled(FontAwesomeIcon)`
  color: grey;
  &:hover {
    cursor: pointer;
  }
`

export const Description = styled.p`
  font-size: 12px;
`
