import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { media } from '../../theme/media'

const lh = '1.35em'
const maxLines = 3

export const Container = styled.div`
  display: flex;
  height: 85px;
  margin: 20px 0;

  ${media.mobile} {
    margin-bottom: 20px;
    height: auto;
  }
`

export const CoverPageLink = styled(Link)`
  width: 75px;
  margin-right: 10px;

  ${media.mobile} {
    margin-right: 12px;
  }
`

export const Image = styled.img`
  width: inherit;
  height: 100%;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }

  ${media.mobile} {
    height: 120px;
    width: 80px;
  }
`

export const Content = styled.div`
  flex: 1;

  width: 325px;

  ${media.mobile} {
    max-width: auto;
  }
`

export const NavBar = styled.div`
  display: flex;
  align-items: flex-start;
`

export const Title = styled.h5`
  margin: 0 5px 0 0;
  color: ${(props): string => props.theme.content.textColor};

  ${media.mobile} {
    font-size: 13px;
    margin-bottom: 5.5px;
  }
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
    bottom: 1.5px;
    right: 6px;
    color: ${(props): string => props.theme.content.textColor};
  }
`
