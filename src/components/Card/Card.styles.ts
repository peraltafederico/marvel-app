import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Container {
  background: string
}

export const Container = styled.div<Container>`
  background-image: ${(props): string => `url(${props.background}) `};
  background-repeat: no-repeat;
  background-size: cover;
  width: 256px;
  height: 380px;
  position: relative;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`

export const StyledStarIcon = styled(FontAwesomeIcon)`
  color: white;
  position: absolute;
  top: 15px;
  right: 15px;
  &:hover {
    cursor: pointer;
  }
`

export const Title = styled.h3`
  color: white;
  position: absolute;
  bottom: 0px;
  left: 15px;
`
