import styled from 'styled-components'
import { media } from '../../theme/media'

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 750px;
  margin-bottom: 30px;

  ${media.mobile} {
    flex-direction: column;
  }
`
export const CoverPage = styled.div`
  display: flex;
  flex: 1;

  ${media.mobile} {
    margin-bottom: 20px;
  }
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
`

export const Content = styled.div`
  margin-left: 30px;
  flex: 1;

  ${media.mobile} {
    margin: 0 0 20px 0;
  }
`

export const Title = styled.h1`
  margin: 0 0 50px 0;
  color: ${(props): string => props.theme.content.textColor};

  ${media.mobile} {
    margin-bottom: 20px;
    font-size: 22px;
  }
`

export const ComicInfo = styled.div`
  margin: 50px 0;
  display: flex;
  flex-flow: column;

  ${media.mobile} {
    margin: 0;
  }
`

export const Data = styled.span`
  font-size: 20px;
  color: ${(props): string => props.theme.content.textColor};
  margin-bottom: 2px;
  font-weight: bold;
  opacity: 1;

  ${media.mobile} {
    font-size: 17px;
  }
`

export const Description = styled.p`
  font-size: 21px;
  margin-bottom: 20px;
  line-height: 1.3em;
  color: ${(props): string => props.theme.content.textColor};

  & ul {
    padding-inline-start: 20px;
  }

  ${media.mobile} {
    font-size: 18px;
  }
`
