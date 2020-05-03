import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const lh = '1.4em'
const maxLines = 3

export const Container = styled.div`
  display: flex;
  height: 85px;
  margin: 20px 0;
`

export const CoverPageLink = styled(Link)`
  width: 75px;
  margin-right: 10px;
`

export const Image = styled.img`
  width: inherit;
  height: 100%;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`

export const Content = styled.div`
  flex: 1;
`

export const NavBar = styled.div`
  display: flex;
  align-items: center;
`

export const Title = styled.h5`
  margin: 0 5px 0 0;
  color: ${(props): string => props.theme.content.textColor};
`

export const StarIcon = styled(FontAwesomeIcon)`
  color: ${(props): string => props.theme.content.iconColor};
  &:hover {
    cursor: pointer;
  }
`

export const DescriptionContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 325px;
`

export const Description = styled.p`
  font-size: 12px;
  max-height: calc(${lh} * ${maxLines});
  line-height: ${lh};
  margin: 5px 0 0;
  padding-right: 18px;
  text-align: justify;
  color: ${(props): string => props.theme.content.textColor};
`

export const Ellipsis = styled.div`
  &::after {
    position: absolute;
    content: '...';
    bottom: 3px;
    right: 6px;
    color: ${(props): string => props.theme.content.textColor};
  }
`
